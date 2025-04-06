import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { supabase } from "../lib/supabase";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { user, isAuthenticated, setUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For development purposes, set a mock user to bypass authentication
        // Remove this in production and uncomment the Supabase auth code
        setUser({
          id: "1",
          email: "user@example.com",
          firstName: "Raghabendra",
          lastName: "Dash",
        });
        setIsLoading(false);

        // Uncomment this for real Supabase authentication
        /*
        // Check if user is authenticated
        const { data: { user: supabaseUser } } = await supabase.auth.getUser();
        
        if (!supabaseUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Set user data
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          firstName: profileData?.first_name,
          lastName: profileData?.last_name,
        });
        setIsLoading(false);
        */
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          // Get user profile
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email!,
            firstName: profileData?.first_name,
            lastName: profileData?.last_name,
          });
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
