import { FC, use } from "react";

import { Button } from "@mui/material";

import { FILTERS } from "../../constants";
import { AppContext } from "../../context/appContext";
import { useStyles } from "../../hooks/useStyles";
import { TFilters } from "../../types";
import styles from "./styles.module.scss";

export const Filters: FC = () => {
  const cx = useStyles(styles);
  const { typeFilter, setTypeFilter } = use(AppContext);

  const onChangeFilter = (type: TFilters) => {
    return () => {
      setTypeFilter?.(type);
    };
  };

  return (
    <div className={cx("container")}>
      {FILTERS.map((item) => {
        const type = item.label.toLowerCase() as TFilters;

        return (
          <Button
            key={item.id}
            className={cx("btn")}
            variant={typeFilter === type ? "outlined" : "contained"}
            color="inherit"
            onClick={onChangeFilter(type)}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};
