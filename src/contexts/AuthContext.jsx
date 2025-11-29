import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Processar callback OAuth se houver hash na URL
    const handleAuthCallback = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const error = hashParams.get('error');
      const errorDescription = hashParams.get('error_description');
      
      if (error) {
        console.error('Erro no callback OAuth:', error, errorDescription);
        // Limpar hash da URL
        window.history.replaceState(null, '', window.location.pathname);
        setLoading(false);
        return;
      }
    };

    handleAuthCallback();

    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session }, error: sessionError }) => {
      if (sessionError) {
        console.error('Erro ao obter sessão:', sessionError);
        setLoading(false);
        return;
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // PGRST116 = no rows returned (perfil não existe)
        if (error.code === 'PGRST116') {
          console.log('Perfil não encontrado, criando perfil padrão...');
          await createDefaultProfile(userId);
        } else {
          // Outros erros (incluindo problemas de conexão)
          console.error('Erro ao buscar perfil:', error);
          
          // Se for erro de conexão do banco, tentar criar perfil mesmo assim
          if (error.message?.includes('terminating connection') || 
              error.message?.includes('SQLSTATE 57P01')) {
            console.warn('Erro de conexão com banco detectado. Verifique se o projeto Supabase está ativo.');
            // Tentar criar perfil novamente após um delay
            setTimeout(() => createDefaultProfile(userId), 2000);
          } else {
            // Para outros erros, tentar criar perfil padrão
            await createDefaultProfile(userId);
          }
        }
      } else if (data) {
        setProfile(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro inesperado ao buscar perfil:', error);
      setLoading(false);
    }
  };

  const createDefaultProfile = async (userId) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Erro ao obter usuário:', userError);
        setLoading(false);
        return;
      }
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .insert([
            {
              id: userId,
              email: user.email,
              role: 'client',
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
              created_at: new Date().toISOString()
            }
          ])
          .select()
          .single();
        
        if (error) {
          // Se o erro for que o perfil já existe, tentar buscar novamente
          if (error.code === '23505') { // Unique violation
            console.log('Perfil já existe, buscando novamente...');
            const { data: existingProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .single();
            
            if (existingProfile) {
              setProfile(existingProfile);
            }
          } else {
            console.error('Erro ao criar perfil padrão:', error);
            // Mesmo com erro, definir um perfil básico em memória
            setProfile({ id: userId, email: user.email, role: 'client' });
          }
        } else if (data) {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error('Erro ao criar perfil padrão:', error);
      // Em caso de erro, definir perfil básico em memória
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setProfile({ id: userId, email: user.email, role: 'client' });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setSession(null);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    updateProfile,
    signOut,
    isAuthenticated: !!session,
    isAdmin: profile?.role === 'admin',
    isClient: profile?.role === 'client',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
