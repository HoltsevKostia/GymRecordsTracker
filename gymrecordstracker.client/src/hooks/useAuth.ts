//export const useAuth = () => {
//    const { user, loading, error, getUser, login, register, logout } = useUserStore();

//    useEffect(() => {
//        if (!user && !loading && !error) {
//            getUser();
//        }
//    }, [user, getUser, error]);

//    const handleLogin = async (credentials: LoginUserDTO) => {
//        await login(credentials);
//    };

//    const handleRegister = async (userData: AddUserDTO) => {
//        await register(userData);
//    };

//    const handleLogout = async () => {
//        await logout();
//    };
//    console.log("useAuth sed.useAuth: user =", user, "loading =", loading);
//    return { user, loading, error, handleLogin, handleRegister, handleLogout };
//};

