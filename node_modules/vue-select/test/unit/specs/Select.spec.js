/* global describe, it, expect */

import Vue from 'vue'
import vSelect from 'src/components/Select.vue'
// import vSelect from '../../../dist/vue-select'
import pointerScroll from 'src/mixins/pointerScroll.js'

Vue.component('v-select', vSelect)

//  http://vue-loader.vuejs.org/en/workflow/testing-with-mocks.html
const Mock = require('!!vue?inject!src/components/Select.vue')

/**
 * Simulate a DOM event.
 * @param target
 * @param event
 * @param process
 * @returns {Event}
 */
function trigger(target, event, process) {
	var e = document.createEvent('HTMLEvents')
	e.initEvent(event, true, true)
	if (process) process(e)
	target.dispatchEvent(e)
	return e
}

function triggerMouse(target, event, process) {
	var e = document.createEvent('MouseEvent')
	e.initEvent('event', true, true)
	if (process) process(e)
	target.dispatchEvent(e)
	return e
}

function triggerFocusEvent(target, event, process) {
	var e = document.createEvent('FocusEvent')
	e.initEvent('event', true, true)
	if (process) process(e)
	target.dispatchEvent(e)
	return e
}

/**
 * Optionally set the search term, then simulate a return keypress.
 * @param vm
 * @param search
 */
function searchSubmit(vm, search = false) {
	if (search) {
		vm.$children[0].search = search
	}

	trigger(vm.$children[0].$els.search, 'keyup', function (e) {
		e.keyCode = 13
	})
}

describe('Select.vue', () => {

	describe('Selecting values', () => {
		it('can accept an array with pre-selected values', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one'],
					options: ['one', 'two', 'three']
				}
			}).$mount()
			expect(vm.$children[0].value).toEqual(vm.value)
		})

		it('can accept an array of objects and pre-selected value (single)', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: {label: 'This is Foo', value: 'foo'},
					options: [{label: 'This is Foo', value: 'foo'}, {label: 'This is Bar', value: 'bar'}]
				}
			}).$mount()
			expect(vm.$children[0].value).toEqual(vm.value)
		})

		it('can accept an array of objects and pre-selected values (multiple)', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true"></v-select></div>',
				components: {vSelect},
				data: {
					value: [{label: 'This is Foo', value: 'foo'}, {label: 'This is Bar', value: 'bar'}],
					options: [{label: 'This is Foo', value: 'foo'}, {label: 'This is Bar', value: 'bar'}]
				}
			}).$mount()
			expect(vm.$children[0].value).toEqual(vm.value)
		})

		it('can deselect a pre-selected object', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true"></v-select></div>',
				data: {
					value: [{label: 'This is Foo', value: 'foo'}, {label: 'This is Bar', value: 'bar'}],
					options: [{label: 'This is Foo', value: 'foo'}, {label: 'This is Bar', value: 'bar'}]
				}
			}).$mount()
			vm.$children[0].select({label: 'This is Foo', value: 'foo'})
			expect(vm.$children[0].value.length).toEqual(1)
		})

		it('can deselect a pre-selected string', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true"></v-select></div>',
				data: {
					value: ['foo', 'bar'],
					options: ['foo','bar']
				}
			}).$mount()
			vm.$children[0].select('foo')
			expect(vm.$children[0].value.length).toEqual(1)
		})

		it('can determine if the value prop is empty', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: [],
					options: ['one', 'two', 'three']
				}
			}).$mount()
			var select = vm.$children[0]
			expect(select.isValueEmpty).toEqual(true)

			select.$set('value', ['one'])
			expect(select.isValueEmpty).toEqual(false)

			select.$set('value', [{l: 'f'}])
			expect(select.isValueEmpty).toEqual(false)

			select.$set('value', 'one')
			expect(select.isValueEmpty).toEqual(false)

			select.$set('value', {label: 'foo', value: 'foo'})
			expect(select.isValueEmpty).toEqual(false)

			select.$set('value', '')
			expect(select.isValueEmpty).toEqual(true)

			select.$set('value', null)
			expect(select.isValueEmpty).toEqual(true)
		})

		it('should reset the selected values when the multiple property changes', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="multiple"></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one'],
					multiple: true,
					options: ['one', 'two', 'three']
				}
			}).$mount()

			vm.multiple = false

			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual(null)
				vm.multiple = true
				Vue.nextTick(() => {
					expect(vm.$children[0].value).toEqual([])
					done()
				})
			})
		})

		it('can retain values present in a new array of options', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one'],
					options: ['one', 'two', 'three']
				}
			}).$mount()
			vm.$children[0].$set('options', ['one', 'five', 'six'])
			expect(vm.$children[0].value).toEqual(['one'])
		})

		it('can determine if an object is already selected', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" multiple :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: [{label: 'one'}],
					options: [{label: 'one'}]
				}
			}).$mount()

			expect(vm.$children[0].isOptionSelected({label: 'one'})).toEqual(true)
		})

		describe('onChange Callback', () => {
			it('can run a callback when the selection changes', (done) => {
				const vm = new Vue({
					template: `<div><v-select :value="['foo']" :options="['foo','bar','baz']" :on-change="cb"></v-select></div>`,
					components: {vSelect},
					methods: {
						cb(val) {
						}
					}
				}).$mount()

				spyOn(vm.$children[0], 'onChange')

				vm.$children[0].select('bar')

				Vue.nextTick(() => {
					expect(vm.$children[0].onChange).toHaveBeenCalledWith('bar')
					vm.$children[0].select('baz')

					Vue.nextTick(() => {
						expect(vm.$children[0].onChange).toHaveBeenCalledWith('baz')
						done()
					})
				})
			})

			it('should run onChange when multiple is true and the value changes', (done) => {
				const vm = new Vue({
					template: `<div><v-select v-ref:select :value="['foo']" :options="['foo','bar','baz']" multiple :on-change="cb"></v-select></div>`,
					methods: {
						cb(val) {
						}
					}
				}).$mount()

				spyOn(vm.$children[0], 'onChange')

				vm.$children[0].select('bar')

				Vue.nextTick(() => {
					expect(vm.$children[0].onChange).toHaveBeenCalledWith(['foo','bar'])
					vm.$children[0].select('baz')

					Vue.nextTick(() => {
						expect(vm.$children[0].onChange).toHaveBeenCalledWith(['foo','bar','baz'])
						done()
					})
				})

			})
		})
	})

	describe('Toggling Dropdown', () => {
		it('should open the dropdown when the el is clicked', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: [{label: 'one'}],
					options: [{label: 'one'}]
				}
			}).$mount()

			vm.$children[0].toggleDropdown({target: vm.$children[0].$els.search})
			Vue.nextTick(() => {
				Vue.nextTick(() => {
					expect(vm.$children[0].open).toEqual(true)
					done()
				})
			})
		})

		it('can close the dropdown when the el is clicked', (done) => {
			const vm = new Vue({
				template: '<div><v-select></v-select></div>',
				components: {vSelect},
			}).$mount()

			spyOn(vm.$children[0].$els.search, 'blur')

			vm.$children[0].open = true
			vm.$children[0].toggleDropdown({target: vm.$children[0].$el})

			Vue.nextTick(() => {
				expect(vm.$children[0].$els.search.blur).toHaveBeenCalled()
				done()
			})
		})

		it('should close the dropdown on search blur', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" multiple :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: [{label: 'one'}],
					options: [{label: 'one'}]
				}
			}).$mount()

			vm.$children[0].open = true
			triggerFocusEvent(vm.$children[0].$els.toggle, 'blur')
			expect(vm.$children[0].open).toEqual(true)
		})

		it('will close the dropdown on escape, if search is empty', (done) => {
			const vm = new Vue({
				template: '<div><v-select></v-select></div>',
				components: {vSelect},
			}).$mount()

			spyOn(vm.$children[0].$els.search, 'blur')

			vm.$children[0].open = true
			vm.$children[0].onEscape()

			Vue.nextTick(() => {
				expect(vm.$children[0].$els.search.blur).toHaveBeenCalled()
				done()
			})
		})

		it('should remove existing search text on escape keyup', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" multiple :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: [{label: 'one'}],
					options: [{label: 'one'}]
				}
			}).$mount()

			vm.$children[0].search = 'foo'
			vm.$children[0].onEscape()
			expect(vm.$children[0].search).toEqual('')
		})

		it('should have an open class when dropdown is active', () => {
			const vm = new Vue({
				template: '<div><v-select></v-select></div>',
				components: {vSelect}
			}).$mount()

			expect(vm.$children[0].dropdownClasses.open).toEqual(false)
		})
	})

	describe('Moving the Typeahead Pointer', () => {
		it('should set the pointer to zero when the filteredOptions change', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options"></v-select></div>',
				components: {vSelect},
				data: {
					options: ['one', 'two', 'three']
				}
			}).$mount()

			vm.$children[0].search = 'two'
			Vue.nextTick(() => {
				expect(vm.$children[0].typeAheadPointer).toEqual(0)
				done()
			})
		})

		it('should move the pointer visually up the list on up arrow keyDown', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options"></v-select></div>',
				components: {vSelect},
				data: {
					options: ['one', 'two', 'three']
				}
			}).$mount()

			vm.$children[0].typeAheadPointer = 1

			trigger(vm.$children[0].$els.search, 'keydown', (e) => e.keyCode = 38)
			expect(vm.$children[0].typeAheadPointer).toEqual(0)
		})

		it('should move the pointer visually down the list on down arrow keyDown', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options"></v-select></div>',
				components: {vSelect},
				data: {
					options: ['one', 'two', 'three']
				}
			}).$mount()

			vm.$children[0].typeAheadPointer = 1
			trigger(vm.$children[0].$els.search, 'keydown', (e) => e.keyCode = 40)
			expect(vm.$children[0].typeAheadPointer).toEqual(2)
		})

		it('should not move the pointer past the end of the list', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options"></v-select></div>',
				components: {vSelect},
				data: {
					options: ['one', 'two', 'three']
				}
			}).$mount()

			vm.$children[0].typeAheadPointer = 2
			vm.$children[0].typeAheadDown()
			expect(vm.$children[0].typeAheadPointer).toEqual(2)
		})

		describe('Automatic Scrolling', () => {
			it('should check if the scroll position needs to be adjusted on up arrow keyDown', () => {
				const vm = new Vue({
					template: '<div><v-select :options="options"></v-select></div>',
					components: {vSelect},
					data: {
						options: ['one', 'two', 'three']
					}
				}).$mount()

				vm.$children[0].typeAheadPointer = 1
				spyOn(vm.$children[0], 'maybeAdjustScroll')
				trigger(vm.$children[0].$els.search, 'keydown', (e) => e.keyCode = 38)
				expect(vm.$children[0].maybeAdjustScroll).toHaveBeenCalled()
			})

			it('should check if the scroll position needs to be adjusted on down arrow keyDown', () => {
				const vm = new Vue({
					template: '<div><v-select :options="options"></v-select></div>',
					components: {vSelect},
					data: {
						options: ['one', 'two', 'three']
					}
				}).$mount()

				spyOn(vm.$children[0], 'maybeAdjustScroll')
				trigger(vm.$children[0].$els.search, 'keydown', (e) => e.keyCode = 40)
				expect(vm.$children[0].maybeAdjustScroll).toHaveBeenCalled()
			})

			it('should check if the scroll position needs to be adjusted when filtered options changes', (done) => {
				const vm = new Vue({
					template: '<div><v-select :options="options"></v-select></div>',
					components: {vSelect},
					data: {
						options: ['one', 'two', 'three']
					}
				}).$mount()

				spyOn(vm.$children[0], 'maybeAdjustScroll')
				vm.$children[0].search = 'two'

				Vue.nextTick(() => {
					expect(vm.$children[0].maybeAdjustScroll).toHaveBeenCalled()
					done()
				})
			})

			it('should scroll up if the pointer is above the current viewport bounds', () => {
				let methods = Object.assign(pointerScroll.methods, {
					pixelsToPointerTop() {
						return 1
					},
					viewport() {
						return {top: 2, bottom: 0}
					}
				})
				const vm = new Vue({
					template: '<div><v-select :options="[\'one\', \'two\', \'three\']"></v-select></div>',
					components: {
						'v-select': Mock({
							'../mixins/pointerScroll': {methods}
						})
					},
				}).$mount()

				spyOn(vm.$children[0], 'scrollTo')
				vm.$children[0].maybeAdjustScroll()
				expect(vm.$children[0].scrollTo).toHaveBeenCalledWith(1)
			})

			it('should scroll down if the pointer is below the current viewport bounds', () => {
				let methods = Object.assign(pointerScroll.methods, {
					pixelsToPointerBottom() {
						return 2
					},
					viewport() {
						return {top: 0, bottom: 1}
					}
				})
				const vm = new Vue({
					template: '<div><v-select :options="[\'one\', \'two\', \'three\']"></v-select></div>',
					components: {
						'v-select': Mock({
							'../mixins/pointerScroll': {methods}
						})
					},
				}).$mount()

				spyOn(vm.$children[0], 'scrollTo')
				vm.$children[0].maybeAdjustScroll()
				expect(vm.$children[0].scrollTo).toHaveBeenCalledWith(vm.$children[0].viewport().top + vm.$children[0].pointerHeight())
			})
		})

		describe('Measuring pixel distances', () => {
			it('should calculate pointerHeight as the offsetHeight of the pointer element if it exists', () => {
				const vm = new Vue({
					template: '<div><v-select :options="[\'one\', \'two\', \'three\']""></v-select></div>',
					components: {vSelect},
				}).$mount()

				//  Fresh instances start with the pointer at -1
				vm.$children[0].typeAheadPointer = -1
				expect(vm.$children[0].pointerHeight()).toEqual(0)

				vm.$children[0].typeAheadPointer = 100
				expect(vm.$children[0].pointerHeight()).toEqual(0)

				vm.$children[0].typeAheadPointer = 1
				expect(vm.$children[0].pointerHeight()).toEqual(vm.$children[0].$els.dropdownMenu.children[1].offsetHeight)
			})
		})
	})

	describe('Removing values', () => {
		it('can remove the given tag when its close icon is clicked', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true"></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one'],
					options: ['one', 'two', 'three']
				}
			}).$mount()
			vm.$children[0].$els.toggle.querySelector('.close').click()
			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual([])
				done()
			})
		})

		it('should remove the last item in the value array on delete keypress when multiple is true', () => {

			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true"></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one', 'two'],
					options: ['one', 'two', 'three']
				}
			}).$mount()
			vm.$children[0].maybeDeleteValue()
			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual(['one'])
			})
		})

		it('should set value to null on delete keypress when multiple is false', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value"></v-select></div>',
				components: {vSelect},
				data: {
					value: 'one',
					options: ['one', 'two', 'three']
				}
			}).$mount()
			vm.$children[0].maybeDeleteValue()
			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual(null)
			})
		})
	})

	describe('Labels', () => {
		it('can generate labels using a custom label key', () => {
			const vm = new Vue({
				template: '<div><v-select label="name" :options="options" :value.sync="value" :multiple="true"></v-select></div>',
				components: {vSelect},
				data: {
					value: [{name: 'Baz'}],
					options: [{name: 'Foo'}, {name: 'Baz'}]
				}
			}).$mount()
			expect(vm.$children[0].$els.toggle.querySelector('.selected-tag').textContent).toContain('Baz')
		})

		it('should display a placeholder if the value is empty', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" placeholder="foo"></v-select></div>',
				components: {vSelect},
				data: {
					options: [{label: 'one'}]
				}
			}).$mount()

			expect(vm.$children[0].searchPlaceholder).toEqual('foo')
			vm.$children[0].value = {label: 'one'}
			Vue.nextTick(() => {
				expect(vm.$children[0].searchPlaceholder).not.toBeDefined()
				done()
			})

			// expect(vm.$children[0].searchPlaceholder()).toEqual('foo')
		})
	})

	describe('When Tagging Is Enabled', () => {
		it('can determine if a given option string already exists', () => {
			const vm = new Vue({
				template: '<div><v-select v-ref:select :options="options" taggable></v-select></div>',
				components: {vSelect},
				data: {
					options: ['one', 'two']
				}
			}).$mount()

			expect(vm.$refs.select.optionExists('one')).toEqual(true)
			expect(vm.$refs.select.optionExists('three')).toEqual(false)
		})

		it('can determine if a given option object already exists', () => {
			const vm = new Vue({
				template: '<div><v-select v-ref:select :options="options" taggable></v-select></div>',
				components: {vSelect},
				data: {
					options: [{label: 'one'}, {label: 'two'}]
				}
			}).$mount()

			expect(vm.$refs.select.optionExists('one')).toEqual(true)
			expect(vm.$refs.select.optionExists('three')).toEqual(false)
		})

		it('can determine if a given option object already exists when using custom labels', () => {
			const vm = new Vue({
				template: '<div><v-select v-ref:select :options="options" label="foo" taggable></v-select></div>',
				components: {vSelect},
				data: {
					options: [{foo: 'one'}, {foo: 'two'}]
				}
			}).$mount()

			expect(vm.$refs.select.optionExists('one')).toEqual(true)
			expect(vm.$refs.select.optionExists('three')).toEqual(false)
		})

		it('can add the current search text as the first item in the options list', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true" taggable></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one'],
					options: ['one', 'two']
				}
			}).$mount()

			vm.$children[0].search = 'three'
			expect(vm.$children[0].filteredOptions).toEqual(['three'])
		})

		it('can select the current search text as a string', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true" taggable></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one'],
					options: ['one', 'two']
				}
			}).$mount()

			searchSubmit(vm, 'three')
			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual(['one', 'three'])
				done()
			})
		})

		it('can select the current search text as an object', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true" taggable></v-select></div>',
				components: {vSelect},
				data: {
					value: [{label: 'one'}],
					options: [{label: 'one'}]
				}
			}).$mount()

			searchSubmit(vm, 'two')
			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual([{label: 'one'}, {label: 'two'}])
				done()
			})
		})

		it('should add a freshly created option/tag to the options list when pushTags is true', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" push-tags :value.sync="value" :multiple="true" taggable></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one'],
					options: ['one', 'two']
				}
			}).$mount()

			searchSubmit(vm, 'three')
			expect(vm.$children[0].options).toEqual(['one', 'two', 'three'])
		})

		it('wont add a freshly created option/tag to the options list when pushTags is false', () => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true" :taggable="true"></v-select></div>',
				components: {vSelect},
				data: {
					value: ['one'],
					options: ['one', 'two']
				}
			}).$mount()

			searchSubmit(vm, 'three')
			expect(vm.$children[0].options).toEqual(['one', 'two'])
		})

		it('should select an existing option if the search string matches a string from options', (done) => {
			let two = 'two'
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true" taggable></v-select></div>',
				components: {vSelect},
				data: {
					value: null,
					options: ['one', two]
				}
			}).$mount()
			vm.$children[0].search = 'two'

			searchSubmit(vm)

			Vue.nextTick(() => {
				expect(vm.$children[0].value[0]).toBe(two)
				done()
			})
		})

		it('should select an existing option if the search string matches an objects label from options', (done) => {
			let two = {label: 'two'}
			const vm = new Vue({
				template: '<div><v-select :options="options" taggable></v-select></div>',
				components: {vSelect},
				data: {
					options: [{label: 'one'}, two]
				}
			}).$mount()

			vm.$children[0].search = 'two'

			Vue.nextTick(() => {
				searchSubmit(vm)
				//  This needs to be wrapped in nextTick() twice so that filteredOptions can
				//  calculate after setting the search text, and move the typeAheadPointer index to 0.
				Vue.nextTick(() => {
					expect(vm.$children[0].value.label).toBe(two.label)
					done()
				})
			})
		})
		it('should not reset the selected value when the options property changes', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" :multiple="true" taggable></v-select></div>',
				components: {vSelect},
				data: {
					value: [{label: 'one'}],
					options: [{label: 'one'}]
				}
			}).$mount()
			vm.$children[0].options = [{label: 'two'}]
			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual([{label: 'one'}])
				done()
			})
		})
	})

	describe('Asynchronous Loading', () => {
		it('can toggle the loading class', () => {
			const vm = new Vue({
				template: '<div><v-select v-ref:select></v-select></div>',
			}).$mount()

			vm.$refs.select.toggleLoading()
			expect(vm.$refs.select.loading).toEqual(true)

			vm.$refs.select.toggleLoading(true)
			expect(vm.$refs.select.loading).toEqual(true)
		})

		it('should trigger the onSearch callback when the search text changes', (done) => {
			const vm = new Vue({
				template: '<div><v-select v-ref:select :on-search="foo"></v-select></div>',
				methods: {
					foo() {
					}
				}
			}).$mount()

			spyOn(vm.$refs.select, 'onSearch')
			vm.$refs.select.search = 'foo'

			Vue.nextTick(() => {
				expect(vm.$refs.select.onSearch).toHaveBeenCalledWith('foo', vm.$refs.select.toggleLoading)
				done()
			})
		})

		it('should not trigger the onSearch callback if the search text is empty', (done) => {
			const vm = new Vue({
				template: '<div><v-select v-ref:select search="foo" :on-search="foo"></v-select></div>',
				methods: {
					foo() {
					}
				}
			}).$mount()

			spyOn(vm.$refs.select, 'onSearch')
			vm.$refs.select.search = ''

			Vue.nextTick(() => {
				expect(vm.$refs.select.onSearch).not.toHaveBeenCalled()
				done()
			})
		})

		it('can set loading to false from the onSearch callback', (done) => {
			const vm = new Vue({
				template: '<div><v-select loading v-ref:select :on-search="foo"></v-select></div>',
				methods: {
					foo(search, loading) {
						loading(false)
					}
				}
			}).$mount()

			vm.$refs.select.search = 'foo'
			Vue.nextTick(() => {
				expect(vm.$refs.select.loading).toEqual(false)
				done()
			})
		})

		it('can set loading to true from the onSearch callback', (done) => {
			const vm = new Vue({
				template: '<div><v-select loading v-ref:select :on-search="foo"></v-select></div>',
				methods: {
					foo(search, loading) {
						loading(true)
					}
				}
			}).$mount()

			let select = vm.$refs.select
			select.onSearch(select.search, select.toggleLoading)

			Vue.nextTick(() => {
				expect(vm.$refs.select.loading).toEqual(true)
				done()
			})
		})
	})

	describe('Reset on options change', () => {
		it('should not reset the selected value by default when the options property changes', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value"></v-select></div>',
				data: {
					value: 'one',
					options: ['one', 'two', 'three']
				}
			}).$mount()
			vm.$children[0].options = ['four', 'five', 'six']
			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual('one')
				done()
			})
		})

		it('should reset the selected value when the options property changes', (done) => {
			const vm = new Vue({
				template: '<div><v-select :options="options" :value.sync="value" reset-on-options-change></v-select></div>',
				components: {vSelect},
				data: {
					value: 'one',
					options: ['one', 'two', 'three']
				}
			}).$mount()
			vm.$children[0].options = ['four', 'five', 'six']
			Vue.nextTick(() => {
				expect(vm.$children[0].value).toEqual(null)
				done()
			})
		})
	})
})