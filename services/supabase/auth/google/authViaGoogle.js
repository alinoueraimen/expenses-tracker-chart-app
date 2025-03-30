import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from '../../init';

WebBrowser.maybeCompleteAuthSession();

// Use a redirect URL that works with Expo
const redirectUri = AuthSession.makeRedirectUri({ 
  path: 'auth/callback' 
});

const handleGoogleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true,
      },
    });
    
    if (error) throw error;
    
    // Open browser with Google auth URL
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUri
    );
    
    if (result.type === 'success') {
      // Handle successful authentication
      console.log("Authentication successful");
    }
  } catch (error) {
    alert(`Login gagal: ${error.message}`);
  }
};

export default handleGoogleLogin;