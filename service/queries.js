import { useQuery } from "@tanstack/react-query";
import api from "core/config/api";

export const useGetUserData = () => {
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"];

  return useQuery({ queryKey, queryFn });
};

export const useGetUserTours = () => {
  const queryFn = () => api.get("/user/tours");
  const queryKey = ["user-tours"];
  return useQuery({ queryFn, queryKey });
};

export const useGetTours = (query) => {
  const url = "/tour?" + QueryString.stringify(query);

  const queryFn = () => api.get(url);
  const queryKey = ["tour"];

  return useQuery({ queryKey, queryFn, enabled: false });
};

export const useGetBasket = () => {
  const queryFn = () => api.get("/basket");
  const queryKey = ["user-basket"];

  return useQuery({ queryKey, queryFn });
};

export const useGetUserTransactions = () => {
  const queryFn = () => api.get("/user/transactions");
  const queryKey = ["user-transactions"];
  return useQuery({ queryKey, queryFn });
};
