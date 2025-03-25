import { useContext } from "react";
import { render } from "@testing-library/react";
import { AppContext } from "./appContext";
import { TFilters } from "../types";

describe("AppContext", () => {
  // 1. Тест с дефолтными значениями
  it("should have default values", () => {
    const TestComponent = () => {
      const context = useContext(AppContext);

      expect(context.typeFilter).toBe("all");
      expect(typeof context.deleteTodo).toBe("function");
      expect(typeof context.editTodo).toBe("function");
      expect(typeof context.onToggleCompleteTodo).toBe("function");
      expect(typeof context.onChangeFilterTodos).toBe("function");
      expect(typeof context.setTypeFilter).toBe("function");

      return null;
    };

    render(
      <AppContext.Provider
        value={{
          typeFilter: "all",
          deleteTodo: () => {},
          editTodo: () => {},
          onToggleCompleteTodo: () => {},
          onChangeFilterTodos: () => {},
          setTypeFilter: () => {},
        }}
      >
        <TestComponent />
      </AppContext.Provider>
    );
  });

  // 2. Тест с кастомными значениями
  it("should provide custom values", () => {
    const mockValues = {
      typeFilter: "active" as TFilters,
      deleteTodo: jest.fn(),
      editTodo: jest.fn(),
      onToggleCompleteTodo: jest.fn(),
      onChangeFilterTodos: jest.fn(),
      setTypeFilter: jest.fn(),
    };

    const TestComponent = () => {
      const context = useContext(AppContext);

      expect(context.typeFilter).toBe("active");
      expect(context.deleteTodo).toBe(mockValues.deleteTodo);
      expect(context.editTodo).toBe(mockValues.editTodo);
      expect(context.onToggleCompleteTodo).toBe(
        mockValues.onToggleCompleteTodo
      );
      expect(context.onChangeFilterTodos).toBe(mockValues.onChangeFilterTodos);
      expect(context.setTypeFilter).toBe(mockValues.setTypeFilter);

      return null;
    };

    render(
      <AppContext.Provider value={mockValues}>
        <TestComponent />
      </AppContext.Provider>
    );
  });
});

describe("AppContext functions", () => {
  const mockValues = {
    typeFilter: "all" as TFilters,
    deleteTodo: jest.fn(),
    editTodo: jest.fn(),
    onToggleCompleteTodo: jest.fn(),
    onChangeFilterTodos: jest.fn(),
    setTypeFilter: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 3. Тест вызова функций
  it("should call deleteTodo with correct id", () => {
    const TestComponent = () => {
      const { deleteTodo } = useContext(AppContext);
      deleteTodo?.("test-id");
      return null;
    };

    render(
      <AppContext.Provider value={mockValues}>
        <TestComponent />
      </AppContext.Provider>
    );

    expect(mockValues.deleteTodo).toHaveBeenCalledWith("test-id");
  });
});
