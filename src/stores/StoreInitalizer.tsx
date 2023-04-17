'use client';

import { PostType } from "@/types/common";
import { useRef } from "react";
import { useMainStore } from ".";

type StoreInitializerParams = {
  posts: PostType[];
  date: string;
}

const StoreInitializer = ({ posts, date }: StoreInitializerParams): null => {
  const initialized = useRef(false);
  if (!initialized.current) {
    useMainStore.setState({ posts, date });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
