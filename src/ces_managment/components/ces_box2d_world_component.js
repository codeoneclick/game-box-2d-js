/* global oop, gb, Box2D */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_box2d_world_component",
	extend: gb.ces_base_component,

	init: function() {

		this.m_type = gb.ces_base_component.type.box2d_world;
		this.m_gravity = new Box2D.b2Vec2(0.0, 9.8);
		this.m_box2d_world = new Box2D.b2World(this.m_gravity);
		this.m_box2d_world.SetContinuousPhysics(true);
		this.m_box2d_definition = new Box2D.b2BodyDef();
		this.m_box2d_definition.set_position(new Box2D.b2Vec2(0.0, 0.0));
		this.m_box2d_body = this.m_box2d_world.CreateBody(this.m_box2d_definition);
		this.m_min_bound = null;
		this.m_max_bound = null;

		Object.defineProperty(this, 'box2d_world', {
			configurable: true,
			get: function() {
				return this.m_box2d_world;
			}
		});
	},

	release: function() {

	},

	methods: {
		set_bounds: function(min_bound, max_bound) {
			this.m_min_bound = min_bound;
			this.m_max_bound = max_bound;
			var bounding_box = new Box2D.b2EdgeShape();
			bounding_box.Set(new Box2D.b2Vec2(min_bound.x, min_bound.y), new Box2D.b2Vec2(max_bound.x, min_bound.y));
        	this.m_box2d_body.CreateFixture(bounding_box, 0);
        	bounding_box.Set(new Box2D.b2Vec2(min_bound.x, max_bound.y), new Box2D.b2Vec2(max_bound.x, max_bound.y));
        	this.m_box2d_body.CreateFixture(bounding_box, 0);
        	bounding_box.Set(new Box2D.b2Vec2(min_bound.x, max_bound.y), new Box2D.b2Vec2(min_bound.x, min_bound.y));
        	this.m_box2d_body.CreateFixture(bounding_box, 0);
        	bounding_box.Set(new Box2D.b2Vec2(max_bound.x, max_bound.y), new Box2D.b2Vec2(max_bound.x, min_bound.y));
        	this.m_box2d_body.CreateFixture(bounding_box, 0);
		}
	},

	static_methods: {

	}
});