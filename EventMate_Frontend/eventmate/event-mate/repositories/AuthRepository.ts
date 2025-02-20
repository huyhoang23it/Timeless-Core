import createRepository from '@/ultilities/createRepository';


export const AuthRepository = createRepository({
  login: async (fetch, email: string, password: string) => {
    const response = await fetch("https://localhost:7121/api/Auth/Login", {
      method: "POST",
      data: {
        email,
        password,
      },
    });
    return response;
  },

  getNew: async (fetch) => {
    const response = await fetch("https://localhost:7121/api/News", {
      method: "GET",
    });
    return response;
  }
});