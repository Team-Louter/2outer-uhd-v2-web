/**
 * props:
 *   - src?: string → 표시할 이미지 경로 (기본값: assets/logo.png)
 *   - alt?: string → 접근성용 대체 텍스트 (기본값: "MyBrand")
 *   - width?: string | number → 로고 가로 크기
 *   - height?: string | number → 로고 세로 크기
 *
 * @예시 <Logo />  // 기본 로고 표시
 *   <Logo width={150} />  // 가로 150px 크기
 *   <Logo src="/assets/newLogo.png" alt="새 로고" width="100px" />
 */

import React from "react";
import styled from "styled-components";
import defaultLogo from "../../assets/uhd-logo.png";

const Img = styled.img`
  display: block;
  width: ${(p) => (p.width ? (typeof p.width === "number" ? `${p.width}px` : p.width) : "120px")};
  height: ${(p) =>
    p.height ? (typeof p.height === "number" ? `${p.height}px` : p.height) : "auto"};
`;

export default function Logo({ src = defaultLogo, alt = "MyBrand", width, height }) {
  return <Img src={src} alt={alt} width={width} height={height} />;
}
