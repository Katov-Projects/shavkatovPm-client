import customAxios from "./customAxios"

interface Bot {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phone: string;
  subject: string;
  telegram: string
};

export const postBot = async (payload: Bot) => {
  try {
    const res = await customAxios.post("/bot", payload);
    return res.data;
  } catch (error) {
    console.log(error, "botga malumot yuborishda xatolik /api")
  }
}