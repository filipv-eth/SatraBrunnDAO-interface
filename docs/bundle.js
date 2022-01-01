
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.3' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Header.svelte generated by Svelte v3.44.3 */

    const file$5 = "src/Header.svelte";

    function create_fragment$5(ctx) {
    	let header;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let h1;
    	let t2;
    	let img1;
    	let img1_src_value;

    	const block = {
    		c: function create() {
    			header = element("header");
    			img0 = element("img");
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "Sätra Brunn DAO";
    			t2 = space();
    			img1 = element("img");
    			if (!src_url_equal(img0.src, img0_src_value = "logo.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "logo");
    			attr_dev(img0, "class", "svelte-1j5e2ak");
    			add_location(img0, file$5, 1, 2, 11);
    			add_location(h1, file$5, 2, 2, 47);
    			if (!src_url_equal(img1.src, img1_src_value = "rectangle-palette.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "color palette");
    			attr_dev(img1, "class", "svelte-1j5e2ak");
    			add_location(img1, file$5, 4, 2, 144);
    			attr_dev(header, "class", "svelte-1j5e2ak");
    			add_location(header, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, img0);
    			append_dev(header, t0);
    			append_dev(header, h1);
    			append_dev(header, t2);
    			append_dev(header, img1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/Links.svelte generated by Svelte v3.44.3 */

    const file$4 = "src/Links.svelte";

    function create_fragment$4(ctx) {
    	let ul;
    	let li0;
    	let a0;
    	let t1;
    	let li1;
    	let a1;
    	let t3;
    	let li2;
    	let a2;
    	let t5;
    	let li3;
    	let a3;

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "twitter";
    			t1 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "discord";
    			t3 = space();
    			li2 = element("li");
    			a2 = element("a");
    			a2.textContent = "notion";
    			t5 = space();
    			li3 = element("li");
    			a3 = element("a");
    			a3.textContent = "github";
    			attr_dev(a0, "href", "https://twitter.com/SatraBrunn");
    			add_location(a0, file$4, 1, 6, 11);
    			attr_dev(li0, "class", "svelte-30mt");
    			add_location(li0, file$4, 1, 2, 7);
    			attr_dev(a1, "href", "https://discord.gg/pQGpBAQM");
    			add_location(a1, file$4, 2, 6, 75);
    			attr_dev(li1, "class", "svelte-30mt");
    			add_location(li1, file$4, 2, 2, 71);
    			attr_dev(a2, "href", "https://satrabrunn.notion.site/S-tra-Brunn-DAO-Notion-2ecbecf19ac3455a83ef6b6206e193bc");
    			add_location(a2, file$4, 4, 6, 240);
    			attr_dev(li2, "class", "svelte-30mt");
    			add_location(li2, file$4, 4, 2, 236);
    			attr_dev(a3, "href", "https://github.com/filipv-eth/SatraBrunnDAO-interface");
    			add_location(a3, file$4, 5, 6, 359);
    			attr_dev(li3, "class", "svelte-30mt");
    			add_location(li3, file$4, 5, 2, 355);
    			attr_dev(ul, "class", "svelte-30mt");
    			add_location(ul, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t1);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(ul, t3);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(ul, t5);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Links', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Links> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Links extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Links",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Footer.svelte generated by Svelte v3.44.3 */
    const file$3 = "src/Footer.svelte";

    function create_fragment$3(ctx) {
    	let footer;
    	let nav;
    	let links;
    	let current;
    	links = new Links({ $$inline: true });

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			nav = element("nav");
    			create_component(links.$$.fragment);
    			attr_dev(nav, "class", "svelte-km89hq");
    			add_location(nav, file$3, 5, 4, 73);
    			attr_dev(footer, "class", "svelte-km89hq");
    			add_location(footer, file$3, 4, 0, 60);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, nav);
    			mount_component(links, nav, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(links.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(links.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			destroy_component(links);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Links });
    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/CollapsibleSection.svelte generated by Svelte v3.44.3 */

    const file$2 = "src/CollapsibleSection.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let h3;
    	let button;
    	let svg0;
    	let path;
    	let t0;
    	let h2;
    	let t1;
    	let t2;
    	let svg1;
    	let circle;
    	let circle_fill_value;
    	let t3;
    	let div0;
    	let div0_hidden_value;
    	let current;
    	let mounted;
    	let dispose;

    	let svg0_levels = [
    		{ width: "21" },
    		{ height: "16" },
    		{ viewBox: "0 0 21 16" },
    		{ fill: "none" },
    		{
    			transform: /*expanded*/ ctx[2] ? "rotate(90)" : undefined
    		},
    		{ xmlns: "http://www.w3.org/2000/svg" }
    	];

    	let svg0_data = {};

    	for (let i = 0; i < svg0_levels.length; i += 1) {
    		svg0_data = assign(svg0_data, svg0_levels[i]);
    	}

    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h3 = element("h3");
    			button = element("button");
    			svg0 = svg_element("svg");
    			path = svg_element("path");
    			t0 = space();
    			h2 = element("h2");
    			t1 = text(/*headerText*/ ctx[0]);
    			t2 = space();
    			svg1 = svg_element("svg");
    			circle = svg_element("circle");
    			t3 = space();
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(path, "d", "M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9L20 9V7L0 7L0 9Z");
    			attr_dev(path, "fill", "#343837");
    			add_location(path, file$2, 22, 8, 653);
    			set_svg_attributes(svg0, svg0_data);
    			toggle_class(svg0, "svelte-qls5nt", true);
    			add_location(svg0, file$2, 14, 7, 438);
    			attr_dev(h2, "class", "svelte-qls5nt");
    			add_location(h2, file$2, 27, 6, 1068);
    			attr_dev(circle, "cx", "50");
    			attr_dev(circle, "cy", "50");
    			attr_dev(circle, "r", "50");
    			attr_dev(circle, "fill", circle_fill_value = `var(${/*color*/ ctx[1]})`);
    			add_location(circle, file$2, 30, 9, 1148);
    			attr_dev(svg1, "viewBox", "0 0 100 100");
    			attr_dev(svg1, "stroke", "black");
    			attr_dev(svg1, "class", "svelte-qls5nt");
    			add_location(svg1, file$2, 29, 6, 1097);
    			attr_dev(button, "aria-expanded", /*expanded*/ ctx[2]);
    			attr_dev(button, "class", "svelte-qls5nt");
    			add_location(button, file$2, 13, 4, 358);
    			attr_dev(h3, "class", "svelte-qls5nt");
    			add_location(h3, file$2, 12, 2, 349);
    			attr_dev(div0, "class", "contents svelte-qls5nt");
    			div0.hidden = div0_hidden_value = !/*expanded*/ ctx[2];
    			add_location(div0, file$2, 35, 2, 1243);
    			attr_dev(div1, "class", "collapsible svelte-qls5nt");
    			add_location(div1, file$2, 11, 0, 321);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h3);
    			append_dev(h3, button);
    			append_dev(button, svg0);
    			append_dev(svg0, path);
    			append_dev(button, t0);
    			append_dev(button, h2);
    			append_dev(h2, t1);
    			append_dev(button, t2);
    			append_dev(button, svg1);
    			append_dev(svg1, circle);
    			append_dev(div1, t3);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(svg0, svg0_data = get_spread_update(svg0_levels, [
    				{ width: "21" },
    				{ height: "16" },
    				{ viewBox: "0 0 21 16" },
    				{ fill: "none" },
    				dirty & /*expanded*/ 4 && {
    					transform: /*expanded*/ ctx[2] ? "rotate(90)" : undefined
    				},
    				{ xmlns: "http://www.w3.org/2000/svg" }
    			]));

    			toggle_class(svg0, "svelte-qls5nt", true);
    			if (!current || dirty & /*headerText*/ 1) set_data_dev(t1, /*headerText*/ ctx[0]);

    			if (!current || dirty & /*color*/ 2 && circle_fill_value !== (circle_fill_value = `var(${/*color*/ ctx[1]})`)) {
    				attr_dev(circle, "fill", circle_fill_value);
    			}

    			if (!current || dirty & /*expanded*/ 4) {
    				attr_dev(button, "aria-expanded", /*expanded*/ ctx[2]);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*expanded*/ 4 && div0_hidden_value !== (div0_hidden_value = !/*expanded*/ ctx[2])) {
    				prop_dev(div0, "hidden", div0_hidden_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CollapsibleSection', slots, ['default']);
    	let { headerText } = $$props;
    	let { color } = $$props;
    	let expanded = false;
    	const writable_props = ['headerText', 'color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CollapsibleSection> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(2, expanded = !expanded);

    	$$self.$$set = $$props => {
    		if ('headerText' in $$props) $$invalidate(0, headerText = $$props.headerText);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ headerText, color, expanded });

    	$$self.$inject_state = $$props => {
    		if ('headerText' in $$props) $$invalidate(0, headerText = $$props.headerText);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('expanded' in $$props) $$invalidate(2, expanded = $$props.expanded);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [headerText, color, expanded, $$scope, slots, click_handler];
    }

    class CollapsibleSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { headerText: 0, color: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CollapsibleSection",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*headerText*/ ctx[0] === undefined && !('headerText' in props)) {
    			console.warn("<CollapsibleSection> was created without expected prop 'headerText'");
    		}

    		if (/*color*/ ctx[1] === undefined && !('color' in props)) {
    			console.warn("<CollapsibleSection> was created without expected prop 'color'");
    		}
    	}

    	get headerText() {
    		throw new Error("<CollapsibleSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set headerText(value) {
    		throw new Error("<CollapsibleSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<CollapsibleSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<CollapsibleSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/FAQ.svelte generated by Svelte v3.44.3 */
    const file$1 = "src/FAQ.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (24:6) {:else}
    function create_else_block(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			i.textContent = "Info coming soon.";
    			add_location(i, file$1, 24, 8, 1124);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(24:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (22:6) {#if question.a}
    function create_if_block(ctx) {
    	let p;
    	let t_value = /*question*/ ctx[1].a + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "svelte-1gei3f4");
    			add_location(p, file$1, 22, 8, 1082);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(22:6) {#if question.a}",
    		ctx
    	});

    	return block;
    }

    // (21:4) <CollapsibleSection headerText={question.q} color={question.c}>
    function create_default_slot(ctx) {
    	let t;

    	function select_block_type(ctx, dirty) {
    		if (/*question*/ ctx[1].a) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(21:4) <CollapsibleSection headerText={question.q} color={question.c}>",
    		ctx
    	});

    	return block;
    }

    // (20:2) {#each questions as question}
    function create_each_block(ctx) {
    	let collapsiblesection;
    	let current;

    	collapsiblesection = new CollapsibleSection({
    			props: {
    				headerText: /*question*/ ctx[1].q,
    				color: /*question*/ ctx[1].c,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(collapsiblesection.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(collapsiblesection, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const collapsiblesection_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				collapsiblesection_changes.$$scope = { dirty, ctx };
    			}

    			collapsiblesection.$set(collapsiblesection_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(collapsiblesection.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(collapsiblesection.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(collapsiblesection, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(20:2) {#each questions as question}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let section;
    	let current;
    	let each_value = /*questions*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(section, "class", "svelte-1gei3f4");
    			add_location(section, file$1, 18, 0, 941);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*questions*/ 1) {
    				each_value = /*questions*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(section, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FAQ', slots, []);

    	let questions = [
    		{
    			q: "What is a DAO?",
    			a: "DAO stands for decentralized autonomous organization. A DAO is an entity with no central leadership and little or no hierarchical management, where proposals are instead made from individual contributors and voted on by the community. A DAO is represented by a program called a smart contract that defines the rules with which the DAO operates. The financial records and smart contract for a DAO are both typically stored on a blockchain.",
    			c: "--red"
    		},
    		{
    			q: "How will Sätra Brunn DAO raise money?",
    			c: "--blue"
    		},
    		{
    			q: "Why Sätra Brunn?",
    			c: "--grayish-blue"
    		},
    		{ q: "How can I join?", c: "--light-gray" },
    		{
    			q: "Is there a roadmap?",
    			c: "--grayish-orange"
    		},
    		{ q: "When can I donate?", c: "--brown" },
    		{
    			q: "Where can I learn more?",
    			c: "--black"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FAQ> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ CollapsibleSection, questions });

    	$$self.$inject_state = $$props => {
    		if ('questions' in $$props) $$invalidate(0, questions = $$props.questions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [questions];
    }

    class FAQ extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FAQ",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.44.3 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let header;
    	let t0;
    	let main;
    	let section;
    	let article;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let p0;
    	let b0;
    	let t3;
    	let t4;
    	let hr;
    	let t5;
    	let p1;
    	let t6;
    	let b1;
    	let t8;
    	let img1;
    	let img1_src_value;
    	let t9;
    	let faq;
    	let t10;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	faq = new FAQ({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			main = element("main");
    			section = element("section");
    			article = element("article");
    			img0 = element("img");
    			t1 = space();
    			p0 = element("p");
    			b0 = element("b");
    			b0.textContent = "Sätra Brunn";
    			t3 = text(" is a 144 acre wellness destination in the suburbs of Stockholm,\n        Sweden, renowned for its healing spring water and picturesque scenery.");
    			t4 = space();
    			hr = element("hr");
    			t5 = space();
    			p1 = element("p");
    			t6 = text("Sätra Brunn DAO plans to buy Sätra Brunn at auction to establish the\n        first-ever real world ");
    			b1 = element("b");
    			b1.textContent = "DAO-governed municipality.";
    			t8 = space();
    			img1 = element("img");
    			t9 = space();
    			create_component(faq.$$.fragment);
    			t10 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(img0, "id", "color-palette");
    			if (!src_url_equal(img0.src, img0_src_value = "circle-palette.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "color palette in circles");
    			attr_dev(img0, "class", "svelte-yk6fu1");
    			add_location(img0, file, 10, 6, 206);
    			add_location(b0, file, 16, 8, 337);
    			attr_dev(p0, "class", "svelte-yk6fu1");
    			add_location(p0, file, 15, 6, 325);
    			attr_dev(hr, "class", "svelte-yk6fu1");
    			add_location(hr, file, 19, 6, 516);
    			add_location(b1, file, 22, 30, 640);
    			attr_dev(p1, "class", "svelte-yk6fu1");
    			add_location(p1, file, 20, 6, 529);
    			attr_dev(article, "class", "svelte-yk6fu1");
    			add_location(article, file, 9, 4, 190);
    			attr_dev(img1, "id", "map");
    			if (!src_url_equal(img1.src, img1_src_value = "map.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "map");
    			attr_dev(img1, "class", "svelte-yk6fu1");
    			add_location(img1, file, 25, 4, 704);
    			attr_dev(section, "id", "main-description");
    			attr_dev(section, "class", "svelte-yk6fu1");
    			add_location(section, file, 8, 2, 154);
    			add_location(main, file, 7, 0, 145);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, section);
    			append_dev(section, article);
    			append_dev(article, img0);
    			append_dev(article, t1);
    			append_dev(article, p0);
    			append_dev(p0, b0);
    			append_dev(p0, t3);
    			append_dev(article, t4);
    			append_dev(article, hr);
    			append_dev(article, t5);
    			append_dev(article, p1);
    			append_dev(p1, t6);
    			append_dev(p1, b1);
    			append_dev(section, t8);
    			append_dev(section, img1);
    			append_dev(main, t9);
    			mount_component(faq, main, null);
    			insert_dev(target, t10, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(faq.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(faq.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(faq);
    			if (detaching) detach_dev(t10);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Header, Footer, FAQ });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
