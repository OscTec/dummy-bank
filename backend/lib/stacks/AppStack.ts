import { App, Stack } from 'aws-cdk-lib'

import { StatefulStack } from './StatefulStack'
import { StatelessStack } from './StatelessStack'

const serviceName = 'quarkBank'

export class AppStack extends Stack {
  public statelessStack: StatelessStack
  public statefulStack: StatefulStack

  constructor (app: App, id: string, description?: string) {
    super(app, id, { description })

    this.statefulStack = new StatefulStack(this, `${serviceName}State`)
    this.statelessStack = new StatelessStack(this, `${serviceName}Stateless`)
  }
}
