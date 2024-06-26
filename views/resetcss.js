import {css} from 'lit';

export const reset = css`
  * {
    margin: 0;
    padding: 0;
  }
  h1 {
    text-align: center;
    font-family: 'Alexandria';
    font-size: 3rem;
    font-weight: 900;
    margin: 2rem 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #e2e2e245;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ffffff63;
    border-radius: 2px;
  }
`;
