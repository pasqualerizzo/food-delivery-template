import React from 'react';
import {ThemeProvider, createTheme} from "@mui/material";
import MaterialTable from "material-table";




const DataTable = ({columns, data, title, actions}) => {

    const defaultMaterialTheme = createTheme(); 

    return (
        
        <ThemeProvider theme={defaultMaterialTheme}>    
            <MaterialTable
                columns={columns}
                data={data}
                title={title}
                actions={actions}
                localization={{
                    toolbar: {
                        searchPlaceholder: 'Cerca',
                        
                    },
                    pagination: {
                        nextAriaLabel: 'ciao',
                        labelRowsPerPage: "Righe Per Pagina",
                        labelRowsSelect: "Righe"
                    }
                }}
            />
                
        </ThemeProvider>
       
    )
}

export default DataTable