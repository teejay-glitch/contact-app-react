import { Clear, Search } from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";

type SearchBarProps = {
    searchKey: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    clearSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchKey, placeholder, onChange, clearSearch }: SearchBarProps) => {
    return (
        <Box display={"flex"} mb={3}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e)}
                placeholder={placeholder}
                size="small"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: searchKey && (
                            <InputAdornment position="end" onClick={clearSearch} style={{ cursor: "pointer" }}>
                                <Clear />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Box>
    );
};

export default SearchBar;
