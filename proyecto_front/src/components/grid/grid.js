import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, {
    PaginationProvider,
    PaginationTotalStandalone,
    PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { request } from '../helper/helper';
import Loading from '../loading/loading';

const { SearchBar } = Search;

class DataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rows: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.setState({loading: true});
        request
        .get(this.props.url)
        .then((response) => {
            this.setState({
                rows: response.data,
                loading: false,
            });
        })
        .catch ((err) => {
            this.setState({loading: false})
            console.error(err);
        });
    }

    render() {
        const options = {
            custom: true,
            totalSize: this.state.rows.length
        };

        return (
            <>
                <Loading show={this.state.loading} />
                <ToolkitProvider
                    keyField="tp"
                    data={ this.state.rows }
                    columns={ this.props.columns }
                    search
                >
                    {
                        props => (
                            <>
                                
                                <PaginationProvider
                                    pagination={ paginationFactory(options) }
                                >
                                    {
                                        ({
                                            paginationProps,
                                            paginationTableProps
                                        }) => (
                                            <>
                                                <Row>
                                                    <Col>
                                                        <SizePerPageDropdownStandalone
                                                            { ...paginationProps }
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <SearchBar { ...props.searchProps } />
                                                    </Col>
                                                </Row>
                                                <PaginationTotalStandalone
                                                    { ...paginationProps }
                                                />
                                                <BootstrapTable
                                                keyField="bt"
                                                data={ this.state.rows }
                                                columns={ this.props.columns }
                                                { ...paginationTableProps }
                                                { ...props.baseProps }
                                                />
                                                <PaginationListStandalone
                                                { ...paginationProps }
                                                />
                                            </>
                                        )
                                    }
                                </PaginationProvider>
                            </>
                        )
                    }
                </ToolkitProvider>
            </>
        );
    }
}
 
export default DataGrid;