const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen mx-auto my-auto sm:h-auto sm:w-[400px] flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
