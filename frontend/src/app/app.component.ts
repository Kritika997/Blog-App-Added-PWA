import { ApplicationRef, Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-app-website';
  private readonly publicKey = 'BAP0qCWtZ7JMndTmAIuv0LfJpZXMXgWBj6XeKGFCpmP-ysLOmqOYp7rLCTa4SqPcFc9K76nJ_p2RvRE-1-a_pj8'

  ngOnInit() {
    this.pushSubscription();
    this.swPush.messages.subscribe((message)=>{
      console.log(message)
    })
  }

  constructor(

    private swPush: SwPush, private update: SwUpdate, private appRef: ApplicationRef) {
    this.updateClient();
    this.checkUpdate();
  }

  updateClient() {
    if (!this.update.isEnabled) {
      console.log('Not Enabled');
      return;
    }
    this.update.available.subscribe((event) => {
      console.log('current ', event.current, 'available ', event.available);
      if (confirm('update available for the app please confirm')) {
        this.update.activateUpdate().then(() => {
          location.reload();
        })
      }
      this.update.activated.subscribe((event) => {
        console.log('current ', event.previous, 'available ', event.current)

      })
    })
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);
        timeInterval.subscribe(() => {
          this.update.checkForUpdate().then(() => {
            console.log('checked');
            console.log('update checked')
          })
        })
      }
    })
  }


  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: this.publicKey,
    }).
      then(subscription => {
        console.log(JSON.stringify(subscription))
      }).
      catch(err => {
        console.log(err)
      })
  }
}
