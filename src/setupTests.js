import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


/**
 * 
 * "jest": {
    "setupTestFrameworkScriptFile": "jest-enzyme",
    "testEnvironment": "enzyme",
    "testEnvironmentOptions": {
      "enzymeAdapter": "react16"
    }
  }
 */