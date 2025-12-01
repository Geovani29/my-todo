import styled from "styled-components";

export const TodoItemListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  animation: fadeIn 0.3s ease-in;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 0.75rem;
  }
`;

export const TodoItemContent = styled.span`
  flex: 1;
  margin-right: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #213547;
  word-break: break-word;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 0.5rem;
    margin-right: 0;
  }
`;

export const TodoItemDone = styled.span`
  min-width: 100px;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  background: ${props => props.children ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'linear-gradient(135deg, #F44336 0%, #d32f2f 100%)'};
  color: white;
  box-shadow: 0 2px 8px ${props => props.children ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'};
  margin-right: 1rem;
  
  @media (max-width: 768px) {
    margin-right: 0.5rem;
    min-width: 80px;
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
`;

export const TodoItemCreatedAt = styled.span`
  min-width: 140px;
  color: #666;
  font-size: 0.85rem;
  margin-right: 1rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TodoItemUpdatedAt = styled.span`
  min-width: 140px;
  color: #666;
  font-size: 0.85rem;
  margin-right: 1rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TodoItemDelete = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
  min-width: 80px;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #ee5a6f 0%, #ff6b6b 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    min-width: 70px;
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
`;

export const Input = styled.input`
  padding: 0.875rem 1.25rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  color: #213547;
  transition: all 0.3s ease;
  flex: 1;
  margin-right: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #999;
  }
  
  @media (max-width: 768px) {
    margin-right: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  display: inline-block;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }
`;