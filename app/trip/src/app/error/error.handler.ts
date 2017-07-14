import{ErrorHandler} from "@angular/core";
import{NgModule} from "@angular/core";
import { Router }      from '@angular/router';

export class TripErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log("My handler", error);
  }
}
@NgModule({
  providers: [{provide: ErrorHandler, useClass: TripErrorHandler}]
})
export class TripErrorModule {}
