import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
function useNavigationUtils(){
    const navigation = useNavigation();
    const navigateAndResetAllRoutes = (route) => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: route }],
          })
        );
      };
      const navigateAndKeepTheRoutes = (routes,params = {}) => {
        try {
          navigation.navigate(routes,params);
        } catch (error) {
          console.error("Error in navigateAndKeepTheRoutes:", error);
        }
      };
      const navigateToPrevRoute = (params={})=>{
            navigation.goBack(params);
      }
      return {
        navigateAndKeepTheRoutes,
        navigateAndResetAllRoutes,
        navigateToPrevRoute
    }
}
export default useNavigationUtils