import styled from 'styled-components';

interface ActionButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const ActionButton = styled.button<ActionButtonProps>`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          &:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: white;
          &:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(250, 112, 154, 0.4);
          }
        `;
      default:
        return `
          background: #e0e0e0;
          color: #333;
          &:hover {
            background: #d0d0d0;
          }
        `;
    }
  }}

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;


