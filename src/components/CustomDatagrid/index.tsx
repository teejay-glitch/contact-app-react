import { IconButton, Paper, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Contact } from "../../models/Contact";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type DataGridProps = {
    rows: Contact[];
    columns: any[];
    toggleEdit: (params: Contact) => void;
    toggleDelete: (params: Contact) => void;
};

const CustomDatagrid: React.FC<DataGridProps> = ({ rows, columns, toggleEdit, toggleDelete }: DataGridProps) => {
    const updatedRow = rows.map((row: Contact, id: number) => {
        return {
            id: id,
            ...row,
        };
    });

    const renderCellComponent = (params: any) => {
        return (
            <React.Fragment>
                <Tooltip title="Edit">
                    <IconButton aria-label="edit" onClick={() => toggleEdit(params?.row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                    <IconButton
                        aria-label="edit"
                        onClick={() => {
                            toggleDelete(params?.row);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    };

    const updatedColumns = () => {
        return [
            ...columns,
            {
                field: "action",
                headerName: "Actions",
                width: 200,
                key: "action",
                flex: 1,
                renderCell: (params: any) => renderCellComponent(params),
            },
        ];
    };

    return (
        <React.Fragment>
            <Paper>
                <div className="grid-container">
                    <DataGrid rows={updatedRow || []} columns={updatedColumns() || []} slots={{ toolbar: null }} />
                </div>
            </Paper>
        </React.Fragment>
    );
};

export default CustomDatagrid;
