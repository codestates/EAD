import axios from 'axios';
import { AppDispatch, RootState, UserPayment } from 'index';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

type RequestPayResponseCallback = (response: RequestPayResponse) => void;

interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback,
  ) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

interface Display {
  card_quota?: number[];
}

interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}

interface RequestPayResponse extends RequestPayAdditionalParams {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

interface IPaymentProps {
  cost: number;
  setCost: Dispatch<SetStateAction<number>>;
}

const PaymentBtn = styled.button`
  width: 100px;
  height: 37px;
  padding: 5px;
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.mini};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  /* @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 85px;
    height: 32px;
  } */
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 85px;
    height: 32px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 85px;
    height: 32px;
  }
  &:hover {
    background-color: ${(props) => props.theme.btnGreen};
    color: ${(props) => props.theme.beige};
  }
`;

function Payment({ cost, setCost }: IPaymentProps) {
  const { userData } = useSelector((state: RootState) => state);
  const { accessToken, userInfo } = userData;
  const dispatch = useDispatch<AppDispatch>();

  const onClickPayment = () => {
    /* 1. ????????? ???????????? */
    const { IMP } = window;
    IMP?.init('imp42587291');

    /* 2. ?????? ????????? ???????????? */
    const data: RequestPayParams = {
      pg: 'html5_inicis', // PG???
      pay_method: 'card', // ????????????
      merchant_uid: `mid_${new Date().getTime()}`, // ????????????
      amount: cost, // ????????????
      name: '???????????? ????????? ?????????', // ?????????
      buyer_name: userInfo.username, // ????????? ??????
      buyer_tel: '', // ????????? ????????????
      buyer_email: userInfo.email, // ????????? ?????????
      buyer_addr: '', // ????????? ??????
      buyer_postcode: '', // ????????? ????????????
      m_redirect_url: `${process.env.REACT_APP_CLIENT}/mobile`, // ???????????? ??? ??????????????? ??? ??????
    };

    /* 4. ?????? ??? ???????????? */
    IMP?.request_pay(data, callback);
  };

  /* 3. ?????? ?????? ???????????? */
  async function callback(rsp: RequestPayResponse) {
    // imp_uid : ????????????
    // merchant_uid : ????????????
    // eslint-disable-next-line camelcase
    const { success } = rsp;

    if (success) {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/users/payment`,
        { cost, id: userInfo.id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );

      dispatch(UserPayment(data.data.data));
      setCost(0);
    } else {
      setCost(0);
    }
  }

  return (
    <PaymentBtn type="button" onClick={onClickPayment}>
      ????????????
    </PaymentBtn>
  );
}

export default Payment;
