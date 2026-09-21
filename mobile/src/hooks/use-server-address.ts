import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const ADDRESS_STORAGE_KEY = "server_address";

export function useServerAddress() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(ADDRESS_STORAGE_KEY)
      .catch(() => null)
      .then((stored) => setAddress(stored ?? ""));
  }, []);

  const saveAddress = useCallback((next: string) => {
    setAddress(next);
    void AsyncStorage.setItem(ADDRESS_STORAGE_KEY, next);
  }, []);

  return [address, saveAddress] as const;
}
