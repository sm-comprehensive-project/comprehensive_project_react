import { useState, useRef } from "react";

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  const handleSearchSubmit = async () => {
    if (!searchValue.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:8088/api/search/all?keyword=${encodeURIComponent(searchValue)}`
      );
      const result = await res.json();
      alert(`📦 카카오 ${result.kakao.length}개, 네이버 ${result.naver.length}개 검색됨`);
    } catch (err) {
      console.error("❌ 검색 실패:", err);
    }
  };

  return {
    searchValue,
    setSearchValue,
    isSearchFocused,
    setIsSearchFocused,
    inputRef,
    searchRef,
    handleSearchFocus,
    clearSearch,
    handleSearchSubmit,
  };
};
