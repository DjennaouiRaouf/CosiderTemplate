
import React, { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableExpandedRows, DataTableRowEvent, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import {Toast as PRToast, Toast} from 'primereact/toast';
import axios from "axios";
import Cookies from "js-cookie";
import {classNames} from "primereact/utils";

interface Order {
    id: string;
    anyCode: string;
    date: string;
    amount: number,
    quantity: number,
    customer: string;
    status: string;
}



export default function MarcheList() {
    const [marches, setMarches] = useState<any[]>([]);
    const [expandedRows, setExpandedRows] = useState<any>(undefined);
    const toast = useRef<Toast>(null);

    const getMarche = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getmarche/`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response) => {
                setMarches(response.data);
            })
            .catch((error) => {

            });

    }
    useEffect(() => {
        getMarche();
    }, []);

    const onRowExpand = (event: DataTableRowEvent) => {
    };

    const onRowCollapse = (event: DataTableRowEvent) => {
    };

    const expandAll = () => {

    };

    const collapseAll = () => {

    };














    const allowExpansion = (rowData: any) => {
        return rowData.avenants!.length > 0;
    };

    const revisableBodyTemplate= (rowData: any) => {
        return <i className={classNames('pi', { 'pi-check-circle text-success': rowData.revisable, 'pi-times-circle text-danger': !rowData.revisable })}></i>;
    };
    const rowExpansionTemplate = (data: any) => {

        return (
            <div className="p-3">
                <DataTable sortMode="multiple" selectionMode="single"  columnResizeMode="expand" resizableColumns   value={data.avenants} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="num_avenant" header="Num Avenant"  />
                    <Column field="revisable" header="Revisable" bodyClassName="text-center" style={{ minWidth: '100px' }} body={revisableBodyTemplate}  />
                    <Column field="rabais" header="Rabais"   />
                    <Column field="tva" header="TVA"  />
                    <Column field="ods_depart" header="ODS Depart"  />
                    <Column field="code_contrat" header="Code Contrat"  />
                    <Column field="ht" header="HT"  />
                    <Column field="ttc" header="TTC"  />
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div>
    );

    return (
        <>


            <PRToast ref={toast} position="top-right" />


            <div className="container-fluid">
                <h3 className="text-dark mb-4">Marchés</h3>
                <div className="card shadow">
                    <div className="card-body" style={{height:"800px"}}>
                        <div className="row" />
                        <div
                            id="dataTable"
                            className="table-responsive table mt-2"
                            role="grid"
                            aria-describedby="dataTable_info"
                        >
                            <DataTable  columnResizeMode="expand"  selectionMode="single" resizableColumns  value={marches} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                                        onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                                        dataKey="id"  paginator rows={20} rowsPerPageOptions={[20, 40, 60, 80,100]}  tableStyle={{ minWidth: '50rem' }}>
                                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                                <Column field="nt.code_site.code_site" header="Code Site"  />
                                <Column field="nt.nt" header="Numero Travail"  />
                                <Column field="nt.code_client.code_client" header="Code Client"  />
                                <Column field="nbr_avenant" header="Nbr avenant"  />
                                <Column field="revisable" header="Revisable" bodyClassName="text-center" style={{ minWidth: '100px' }} body={revisableBodyTemplate}   />
                                <Column field="rabais" header="Rabais"   />
                                <Column field="tva" header="TVA"  />
                                <Column field="ods_depart" header="ODS Depart"  />
                                <Column field="code_contrat" header="Code Contrat"  />
                                <Column field="ht" header="HT"  />
                                <Column field="ttc" header="TTC"  />

                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>




        </>
    );
}
        