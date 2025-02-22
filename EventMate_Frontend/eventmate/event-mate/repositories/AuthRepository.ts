import createRepository from '@/ultilities/createRepository';


export const AuthRepository = createRepository({
  login: async (fetch, email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/login`, {
      method: "POST",
      data: {
        email,
        password,
      },
    });
    return response;
  },

  forgotPassword: async (fetch, data: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/forgot-password`, {
      method: "POST",
      data,
      
      
    });
    return response;
  }

});