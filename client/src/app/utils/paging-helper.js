
import { maxPages } from '../../constants';

/**@description Method that
 *  Calculates which page controls can be shown into the view at a time
 * @returns {Object} this object has the startPage and endPage as properties
 */
const calculateStartAndEndPage = (page, totalPages) => {
        //page controls to be displayed before the selected one
        const pagesBefore = page > Math.round(maxPages / 2) ? Math.round(maxPages / 2) : Math.max(page - 1, 0);
        let extraPages = maxPages - pagesBefore;
        //page controls to be displayed after the selected one
        const pagesAfter = (totalPages - page) >= extraPages ? extraPages : totalPages - page;

        const startPage = page - pagesBefore;
        const endPage = page + pagesAfter;
        return { startPage, endPage };
}

export {calculateStartAndEndPage};

