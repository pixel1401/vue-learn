import { Directive, DirectiveBinding, ObjectDirective } from "vue";
 
export interface IObserver {
    getLoadData : () => any,
    page : number,
    totalPage : number,
    isPaginationOrScroll : boolean
}


export default {
    name : 'observer' ,
    mounted(el : Element , binding : DirectiveBinding<IObserver>) {
       

        let observerElem = el as Element;
  
        let options = {
          rootMargin: '0px',
          threshold: 1.0
        }
        let callback: IntersectionObserverCallback = (entries, observer) => {
          if (entries[0].isIntersecting == false || !binding.value.isPaginationOrScroll || binding.value.page +1  < binding.value.totalPage ) return;

            binding.value.getLoadData();
        };
        let observer = new IntersectionObserver(callback, options);
        observer.observe(observerElem);

    }
}