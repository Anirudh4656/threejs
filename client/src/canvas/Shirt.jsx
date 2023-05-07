import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';
const Shirt = () => {
    const snap = useSnapshot(state);
    //imported 3d model with useGLTF hook.
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);
  return (
    // whenever state changes it will render component
    <group
    key={stateString}>
        <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* The Decal component is a built-in component in Three.js that allows you to add decals to a 3D object. A decal is a 2D image that is projected onto the surface of a 3D object, as if it had been painted or applied as a sticker.
In this code, there are two Decal components being used, one for a full texture and one for a logo texture. Which one is used depends on the properties of the 
snap object.The  position prop specifies the position of the decal relative to the center of the 3D object. In this case, the position is being set to [0, 0, 0]
 for the full texture decal, and [0, 0.04, 0.15]for the logo texture decal.The rotation
 prop specifies the rotation of the decal relative to the 3D object. In this case, the rotation is being set to [0, 0, 0]
 for both decals, which means that they are not being rotated.
The scale prop specifies the scale of the decal relative to the 3D object. In this case, the scale is being set to 1 for the full texture decal, and 0.15for the logo texture decal.
The mapprop specifies the texture to be used for the decal. In this case, the fullTextureand logoTexture
 variables are being used, which presumably contain pre-loaded textures.The map-anisotropy
 prop is used to control the level of anisotropic filtering applied to the texture. Anisotropic filtering can improve the quality of textures when viewed at oblique angles.
The depthTestprop is used to control whether the decal should be occluded by other objects in the scene based on depth. If depthTestis set to 
false, the decal will always be visible, even if it is behind other objects.The 
depthWriteprop is used to control whether the decal should write to the depth buffer. If depthWriteis set to true
, the decal will occlude other objects in the scene based on depth. */}
         {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}

      </mesh>
    </group>
  )
}

export default Shirt