"use client";

import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { socket } from "@/lib/socket";
import { setStats } from "@/redux/slices/statsSlice";
import { AppDispatch, RootState } from "@/redux/store";

export const useStatsSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("stats-update", (data) => {
      console.log("Yangi statistikalar:", data);
      dispatch(setStats(data));
    });

    return () => {
      socket.off("stats-update");
      socket.off("connect");
    };
  }, [dispatch]);
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;