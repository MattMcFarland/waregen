export default `<?xml version="1.0" encoding="utf-8"?>
<gamestarts xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="gamestarts.xsd">

  <gamestart id="waregen_example_start" name="WareGen Example" description="WareGen Example" image="gamestart_5" group="2">
    <info>
      <item name="Location" value="Nathan's Legacy, Argon Prime" />
      <item name="Starting Ship" value="Hercher" />
    </info>
    <location galaxy="xu_ep2_universe_macro" zone="zone002_cluster_14_sector001_macro">
      <position x="-4850.0" y="0.0" z="-5223.3" />
      <rotation yaw="14.1" pitch="-3.0" roll="0.0" />
    </location>
    <player macro="character_player_tutorial_macro" money="10000000">
      <ship macro="ship_arg_s_fighter_01_a_macro">
        <loadout>
          <macros>
            <engine macro="engine_arg_s_combat_01_mk2_macro" path="../con_engine_01" />
            <engine macro="engine_arg_s_combat_01_mk2_macro" path="../con_engine_02" />
            <weapon macro="weapon_gen_s_gatling_01_mk2_macro" path="../con_primaryweapon_01" optional="1" />
            <weapon macro="weapon_gen_s_gatling_01_mk2_macro" path="../con_primaryweapon_02" optional="1" />
            <shield macro="shield_arg_s_standard_01_mk2_macro" path="../con_shield_01" optional="1" />
          </macros>
          <ammunition>
            <ammunition macro="eq_arg_satellite_01_macro" exact="10" optional="true" />
          </ammunition>
          <virtualmacros>
            <thruster macro="thruster_gen_s_combat_01_mk1_macro" />
          </virtualmacros>
        </loadout>
      </ship>
      <inventory>
        <ware ware="inv_timewarp" amount="1" />
        <ware ware="inv_interfaceunit" amount="6" />
        <ware ware="weapon_gen_spacesuit_repairlaser_01_mk1" amount="1" />
        <ware ware="software_scannerobjectmk3" amount="1" />
      </inventory>
      <blueprints>
        <ware ware="paintmod_0006"/>
        <ware ware="paintmod_0048"/>
        <ware ware="paintmod_0049"/>
        <ware ware="paintmod_0050"/>
      </blueprints>
      <research>
        <ware ware="research_teleportation" />
        <ware ware="research_teleportation_range_01" />
        <ware ware="research_teleportation_range_02" />
        <ware ware="research_teleportation_range_03" />
        <ware ware="research_radioreceiver" />
        <ware ware="research_sensorbooster" />
        <ware ware="research_tradeinterface" />
        <ware ware="research_module_defence" />
        <ware ware="research_module_habitation" />
        <ware ware="research_module_production" />
        <ware ware="research_module_storage" />
        <ware ware="research_module_dock" />
        <ware ware="research_module_build" />
      </research>
      <timeline>
        <entry ref="gate_stabilisation" />
      </timeline>
    </player>
  </gamestart>


</gamestarts>
`;
