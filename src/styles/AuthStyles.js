import styled from 'styled-components';

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.95rem;
  color: #1f2937;
  font-weight: 700;
  text-align: left;

  &.input-with-action {
    position: relative;
  }
`;

export const InputFieldRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Input = styled.input`
  height: 52px;
  border-radius: 12px;
  border: none;
  padding: 0 20px;
  background-color: #f3f4f6;
  font-size: 0.95rem;
  color: #1f2937;
  outline: none;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  font-weight: 400;

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:focus {
    background-color: #e5e7eb;
    box-shadow: inset 0 0 0 2px rgba(30, 39, 70, 0.1);
  }

  @media (max-width: 640px) {
    height: 48px;
    padding: 0 16px;
  }
`;

export const InlineActionButton = styled.button`
  height: 52px;
  padding: 0 24px;
  border-radius: 12px;
  border: none;
  background-color: #f3f4f6;
  color: #1f2937;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: #e5e7eb;
  }

  &:active {
    background-color: #d1d5db;
  }

  @media (max-width: 640px) {
    height: 48px;
    padding: 0 20px;
    font-size: 0.85rem;
  }
`;

export const FieldStatus = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: -4px;
  color: ${props => props.$match ? '#10b981' : '#ef4444'};
`;

export const RememberMe = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #4b5563;
  font-weight: 400;
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 2px solid #d1d5db;
    cursor: pointer;
    accent-color: #1e2746;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  height: 54px;
  border-radius: 14px;
  border: none;
  background-color: #1e2746;
  color: #ffffff;
  font-size: 0.98rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background-color: #2a3454;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(30, 39, 70, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(30, 39, 70, 0.2);
  }

  @media (max-width: 640px) {
    height: 50px;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  height: 54px;
  border-radius: 14px;
  border: 2px solid #e5e7eb;
  background-color: #ffffff;
  color: #1f2937;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }

  &:active {
    background-color: #f3f4f6;
  }

  @media (max-width: 640px) {
    height: 50px;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;
  margin-top: 8px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 12px 0;
`;

export const GhostLinkButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 8px;

  &:hover {
    color: #1f2937;
  }

  &:active {
    color: #111827;
  }
`;