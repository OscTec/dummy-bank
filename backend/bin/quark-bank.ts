import * as cdk from 'aws-cdk-lib'

import { AppStack } from '../lib/stacks/AppStack'

const app = new cdk.App()

const serviceName = 'quarkBank'

new AppStack(app, `${serviceName}App`)
