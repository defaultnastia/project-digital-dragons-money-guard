import styled from "@emotion/styled";
import Select from "react-dropdown-select";

const StyledSelect = styled(Select)`
  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    color: #fff;
    border: none;
    width: 18px;
  }

  .react-dropdown-select {
    position: relative;
  }

  .react-dropdown-select-input::placeholder {
    position: absolute;
    font-size: 16px;
    width: 100px;
  }

  .react-dropdown-select-input {
    margin-left: 0 !important;
    font-size: 16px;
  }

  .react-dropdown-select:focus-within {
    box-shadow: none !important;
  }

  .react-dropdown-select-dropdown-handle svg {
    width: 18px;
  }

  .react-dropdown-select-dropdown-handle:hover path {
    stroke: var(--dashboard-text-color);
  }

  .react-dropdown-select-option {
    border: none;
  }

  .react-dropdown-select-dropdown {
    max-height: 157px;
    padding-top: 12px;
    padding-bottom: 12px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(
      0deg,
      rgba(83, 61, 186, 1) 0%,
      rgba(80, 48, 154, 1) 43.14%,
      rgba(106, 70, 165, 1) 73.27%,
      rgba(133, 93, 175, 1) 120.03%
    );
  }

  .react-dropdown-select-item {
    padding: 6px 20px;
    border: none;
    :hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--dashboard-text-color) !important;
    }
  }

  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: var(--dashboard-text-color) !important;
  }

  .react-dropdown-select-item.react-dropdown-select-item-disabled {
    background: #777;
    color: #ccc;
  }
`;

export default StyledSelect;
