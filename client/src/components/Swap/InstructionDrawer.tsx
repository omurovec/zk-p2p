import React, { useReducer, useRef } from "react";
import styled from 'styled-components';
import { ChevronDown } from 'react-feather';
import { useNavigate } from 'react-router-dom'

import { InstructionStep } from "@components/Swap/InstructionStep";
import { Input } from "@components/common/Input";


interface InstructionDrawerProps {
  recipientAddress?: string;
  setRecipientAddress: (address: string) => void;
  isLoggedIn: boolean;
}

export const InstructionDrawer: React.FC<InstructionDrawerProps> = ({
  recipientAddress,
  setRecipientAddress,
  isLoggedIn,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /*
   * State
   */

  const [isOpen, toggleOpen] = useReducer((s) => !s, false)

  /*
   * Handlers
   */

  const navigateToSwapHandler = () => {
    navigate('/deposits');
  };

  /*
   * Component
   */

  return (
    <Wrapper ref={ref}>
      <TitleLabelAndDropdownIconContainer>
        <TokenLabel>
          Instructions
        </TokenLabel>
        
        <StyledChevronDown
          onClick={toggleOpen}
          $isOpen={isOpen}
        />
      </TitleLabelAndDropdownIconContainer>

      <InstructionsDropdown $isOpen={isOpen}>
        <HorizontalDivider/>
        <InstructionListContainer>
          <InstructionStep step={1}>
            Enter an amount to receive a quote. You are assigned the best available rate for the requested amount
          </InstructionStep>

          <InstructionStep step={2}>
            Optionally, provide a recipient address below to receive funds in another wallet. Submit transaction to start your order
          </InstructionStep>

          <InputWrapper>
            <Input
              label="Recipient"
              name="recipientAddress"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder={!isLoggedIn ? 'Wallet disconnected' : 'Recipient address'}
              readOnly={!isLoggedIn}
            />
          </InputWrapper>

          <InstructionStep step={3}>
            Click 'Send' and complete the payment on Venmo. Ensure you have email notifications from Venmo enabled
          </InstructionStep>

          <InstructionStep step={4}>
            Continue through to validate email proof of transaction. Submit transaction containing proof to receive the requested USDC
          </InstructionStep>
        </InstructionListContainer>

        <LiquidityLink onClick={navigateToSwapHandler}>
          Interested in providing liquidity?
        </LiquidityLink>
      </InstructionsDropdown>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 16px;
  border: 1px solid #98a1c03d;
  background: #0D111C;
  overflow: hidden;
`;

const TitleLabelAndDropdownIconContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0px 12px;
`;

const TokenLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

interface StyledChevronDownProps {
  $isOpen?: boolean;
}

const StyledChevronDown = styled(ChevronDown)<StyledChevronDownProps>`
  width: 20px;
  height: 20px;
  color: #CED4DA;

  transition: transform 0.4s;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const HorizontalDivider = styled.div`
  width: 100%;
  border-top: 1px solid #98a1c03d;
`;

interface InstructionsDropdownProps {
  $isOpen?: boolean;
}

const InstructionsDropdown = styled.div<InstructionsDropdownProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #0D111C;
  color: #FFF;
  align-items: center;
  gap: 16px;
  overflow: hidden;

  max-height: ${({ $isOpen }) => $isOpen ? '500px' : '0px'};
  transition: max-height 0.4s ease-out;
`;

const InstructionListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  padding: 0 20px;
`;

const LiquidityLink = styled.button`
  font-size: 14px;
  font-family: 'Graphik';
  color: #FFFFFF;
  opacity: 0.3;
  text-align: center;
  padding-bottom: 20px;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
`;