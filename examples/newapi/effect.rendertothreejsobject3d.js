/**
 * render to three.js THREE.Object3D
 }
*/
Fireworks.EffectsStackBuilder.prototype.renderToThreejsObject3D	= function(opts)
{
	var effectId	= opts.effectId	|| 'renderToThreeParticleSystem';
	// create the effect itself
	Fireworks.createEffect(effectId)
	.onCreate(function(particle, particleIdx){
		particle.set('threejsObject3D', {
			object3d	: opts.create()
		});
		console.assert(particle.get('threejsObject3D').object3d instanceof THREE.Object3D);
		var object3d	= particle.get('threejsObject3D').object3d;
		object3d.visible= false;
	}).onBirth(function(particle){
		var object3d	= particle.get('threejsObject3D').object3d;
		object3d.visible= true;
	}).onDeath(function(particle){
		var object3d	= particle.get('threejsObject3D').object3d;
		object3d.visible= false;		
	}).onRender(function(particle){
		var object3d	= particle.get('threejsObject3D').object3d;
		var position	= particle.get('position').vector;
		object3d.position.set(position.x, position.y, position.z);
	}).pushTo(this._emitter);
	return this;	// for chained API
};
