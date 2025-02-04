import { Pipe, PipeTransform } from '@angular/core';
import { DevelopmentCostProduct } from '@shared/types/development-cost.types';

@Pipe({
    name: 'sort',
})
export class SortPipe implements PipeTransform {
    public transform(developmentCosts: DevelopmentCostProduct[]): DevelopmentCostProduct[] {
        return developmentCosts.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
}
