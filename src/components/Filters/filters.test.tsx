import { render, screen, fireEvent } from "@testing-library/react";
import { Filters } from "./Filters";
import { AppContext } from "../../context/appContext";
import { FILTERS } from "../../constants";
import { Button } from "@mui/material";
import { TFilters } from "../../types";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  Button: jest.fn(({ children, ...props }) => (
    <button {...props}>{children}</button>
  )),
}));

describe("Filters Component", () => {
  const mockSetTypeFilter = jest.fn();
  const mockContextValue = {
    typeFilter: "all" as TFilters | undefined,
    setTypeFilter: mockSetTypeFilter,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter buttons", () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Filters />
      </AppContext.Provider>
    );

    FILTERS.forEach((filter) => {
      expect(screen.getByText(filter.label)).toBeInTheDocument();
    });
  });

  it("calls setTypeFilter with correct value when button is clicked", () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Filters />
      </AppContext.Provider>
    );

    const testFilter = FILTERS[1]; // берем второй фильтр для теста
    const button = screen.getByText(testFilter.label);
    fireEvent.click(button);

    expect(mockSetTypeFilter).toHaveBeenCalledTimes(1);
    expect(mockSetTypeFilter).toHaveBeenCalledWith(
      testFilter.label.toLowerCase()
    );
  });

  it("applies correct variant to active filter button", () => {
    const activeFilter = FILTERS[0].label.toLowerCase() as TFilters;
    render(
      <AppContext.Provider
        value={{ ...mockContextValue, typeFilter: activeFilter }}
      >
        <Filters />
      </AppContext.Provider>
    );

    // Получаем все вызовы Button
    const buttonCalls = (Button as jest.Mock).mock.calls;

    // Находим вызов для активного фильтра
    const activeButtonCall = buttonCalls.find(
      (call) => call[0].children === FILTERS[0].label
    );

    // Находим вызовы для неактивных фильтров
    const inactiveButtonCalls = buttonCalls.filter(
      (call) => call[0].children !== FILTERS[0].label
    );

    // Проверяем активную кнопку
    expect(activeButtonCall[0]).toMatchObject({
      variant: "outlined",
      className: "btn",
    });

    // Проверяем неактивные кнопки
    inactiveButtonCalls.forEach((call) => {
      expect(call[0]).toMatchObject({
        variant: "contained",
        className: "btn",
      });
    });
  });
});
