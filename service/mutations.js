import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "core/config/api";
import { setCookie } from "core/utils/cookie";

const useSendOTP = () => {
  const mutationFn = (data) => api.post(`/auth/send-otp`, data);
  return useMutation({
    mutationFn,
  });
};

const useCheckOTP = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.post(`/auth/check-otp`, data);

  const onSuccess = (data) => {
    setCookie("accessToken", data?.data?.accessToken, 30);
    setCookie("refreshToken", data?.data?.refreshToken, 365);
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

const useAddToBasket = () => {
  const mutationFn = (id) => api.put(`/basket/${id}`);
  return useMutation({
    mutationFn,
  });
};

const useCheckout = () => {
  const mutationFn = (data) => api.post(`/order`, data);
  return useMutation({
    mutationFn,
  });
};

const useEditProfile = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.put("/user/profile", data);

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["user-data"],
      }),
  });
};

export { useSendOTP, useCheckOTP, useAddToBasket, useCheckout, useEditProfile };
