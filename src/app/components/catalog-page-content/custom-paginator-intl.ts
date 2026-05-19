import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = '';
  override nextPageLabel = 'Próxima';
  override previousPageLabel = 'Anterior';
  override firstPageLabel = 'Primeira';
  override lastPageLabel = 'Última';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}