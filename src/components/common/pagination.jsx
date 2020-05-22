import React from "react";
import _ from "lodash";
import { default as PaginationBootstrap } from 'react-bootstrap/Pagination';

const Pagination = props => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    const pagesCount = itemsCount / pageSize;

    if (pagesCount < 1) return null;

    const pages = _.range(1, pagesCount + 1);

    return (
        <PaginationBootstrap>
            {pages.map(page => (
                <PaginationBootstrap.Item
                    key={page}
                    className={currentPage === page && "active"}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PaginationBootstrap.Item>
            ))}
        </PaginationBootstrap>
    );
};

export default Pagination;
