describe("thing", () => {
	it("works", () => {
		expect(1).toEqual(1);
	});
});

// port { createMockStore } from 'redux-logic-test'
// import { fakeSchedulers } from 'rxjs-marbles/jest'
// import { of } from 'rxjs'
// import analyticsReducer from '../../reducer/analytics'
// import { getTemplateAnalyticsLogic } from '../getTemplateAnalytics'
// import * as constants from '../../constants'

// const fakeHttp = {
//   getBody({ response }) {
//     return response
//   },
//   post: jest.fn(() => of({ response: {} }))
// }

// describe('logic for getting user analytics', () => {
//   beforeEach(() => jest.useFakeTimers())

//   const store = createMockStore({
//     logic: [getTemplateAnalyticsLogic],
//     reducer: analyticsReducer,
//     injectedDeps: { http: fakeHttp }
//   })

//   const processor = getTemplateAnalyticsLogic

//   afterEach(() => store.resetActions())

//   it('calls into api to get user analytics data',
//     fakeSchedulers(advance => {
//       store.dispatch({
//         type: constants.GET_TEMPLATE_ANALYTICS.ACTION,
//         payload: {
//           activeProcess: 'design-view',
//           endDate: '2019-03-19',
//           startDate: '2019-02-28'
//         }
//       })
//       advance(processor.debounce)
//       expect(fakeHttp.post).toHaveBeenCalled()
//     })
//   )
// })
