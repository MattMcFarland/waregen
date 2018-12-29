export default `<?xml version="1.0" encoding="utf-8"?>
<mdscript name="XCG_Setup_Gamestarts" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="md.xsd">
  <cues>

    <cue name="WAREGEN_example_start" module="waregen_example_start">
      <conditions>
        <event_cue_signalled cue="md.Setup.GameStart" />
      </conditions>
      <actions>
        <debug_text text="'EXTest_gamestart is running'"/>
        <set_faction_known faction="faction.alliance" known="true" />
        <set_faction_known faction="faction.antigone" known="true" />
        <set_faction_known faction="faction.argon" known="true" />
        <set_faction_known faction="faction.hatikvah" known="true" />
        <set_faction_known faction="faction.holyorder" known="true" />
        <set_faction_known faction="faction.ministry" known="true"/>
        <set_faction_known faction="faction.scaleplate" known="true" />
        <set_faction_known faction="faction.teladi" known="true" />
        <set_faction_known faction="faction.xenon" known="true" />

        <create_ship name="$BuilderShip" macro="ship_arg_xl_builder_01_a_macro" zone="player.zone">
          <owner exact="faction.player" overridenpc="true" />
          <loadout>
            <level exact="0.5"/>
          </loadout>
          <pilot>
            <select race="[race.argon, race.paranid, race.teladi]" tags="tag.aipilot"/>
          </pilot>
          <drop ref="ship_large_civilian" />
          <safepos object="player.ship" x="4km" y="1km" z="6km" />
        </create_ship>

        <set_object_commander object="$BuilderShip" commander="player.ship" />

        <!-- production modules -->
        <add_blueprints wares="ware.example_prod_gen_glass_macro_01" />
        <add_blueprints wares="ware.example_prod_gen_plastic_macro_01" />

        <add_blueprints wares="ware.module_gen_prod_energycells_01" />
        <add_blueprints wares="ware.module_gen_prod_refinedmetals_01" />
        <add_blueprints wares="ware.module_gen_prod_water_01" />

        <add_blueprints wares="ware.clothingmod_0001" />
        <add_blueprints wares="ware.clothingmod_0002" />
        <add_blueprints wares="ware.module_arg_conn_base_01" />
        <add_blueprints wares="ware.module_arg_conn_base_02" />
        <add_blueprints wares="ware.module_arg_conn_base_03" />
        <add_blueprints wares="ware.module_arg_conn_cross_01" />
        <add_blueprints wares="ware.module_arg_conn_vertical_01" />
        <add_blueprints wares="ware.module_arg_conn_vertical_02" />
        <add_blueprints wares="ware.module_arg_def_claim_01" />
        <add_blueprints wares="ware.module_arg_def_disc_01" />
        <add_blueprints wares="ware.module_arg_def_tube_01" />
        <add_blueprints wares="ware.module_arg_dock_m_01" />
        <add_blueprints wares="ware.module_arg_dock_m_01_hightech" />
        <add_blueprints wares="ware.module_arg_dock_m_01_lowtech" />
        <add_blueprints wares="ware.module_arg_dock_m_02" />
        <add_blueprints wares="ware.module_arg_dock_m_02_hightech" />
        <add_blueprints wares="ware.module_arg_dock_m_02_lowtech" />
        <add_blueprints wares="ware.module_arg_hab_l_01" />
        <add_blueprints wares="ware.module_arg_hab_m_01" />
        <add_blueprints wares="ware.module_arg_hab_s_01" />
        <add_blueprints wares="ware.module_arg_pier_l_01" />
        <add_blueprints wares="ware.module_arg_pier_l_02" />
        <add_blueprints wares="ware.module_arg_pier_l_03" />
        <add_blueprints wares="ware.module_arg_stor_container_l_01" />
        <add_blueprints wares="ware.module_arg_stor_container_m_01" />
        <add_blueprints wares="ware.module_arg_stor_container_s_01" />
        <add_blueprints wares="ware.module_arg_stor_liquid_l_01" />
        <add_blueprints wares="ware.module_arg_stor_liquid_m_01" />
        <add_blueprints wares="ware.module_arg_stor_liquid_s_01" />
        <add_blueprints wares="ware.module_arg_stor_solid_l_01" />
        <add_blueprints wares="ware.module_arg_stor_solid_m_01" />
        <add_blueprints wares="ware.module_arg_stor_solid_s_01" />
        <add_blueprints wares="ware.module_par_conn_base_01" />
        <add_blueprints wares="ware.module_par_conn_base_02" />
        <add_blueprints wares="ware.module_par_conn_base_03" />
        <add_blueprints wares="ware.module_par_conn_cross_01" />
        <add_blueprints wares="ware.module_par_conn_cross_02" />
        <add_blueprints wares="ware.module_par_conn_cross_03" />
        <add_blueprints wares="ware.module_par_conn_vertical_01" />
        <add_blueprints wares="ware.module_par_conn_vertical_02" />
        <add_blueprints wares="ware.module_par_def_claim_01" />
        <add_blueprints wares="ware.module_par_def_disc_01" />
        <add_blueprints wares="ware.module_par_def_tube_01" />
        <add_blueprints wares="ware.module_par_hab_l_01" />
        <add_blueprints wares="ware.module_par_hab_m_01" />
        <add_blueprints wares="ware.module_par_hab_s_01" />
        <add_blueprints wares="ware.module_par_pier_l_01" />
        <add_blueprints wares="ware.module_par_pier_l_02" />
        <add_blueprints wares="ware.module_par_pier_l_03" />
        <add_blueprints wares="ware.module_par_stor_container_l_01" />
        <add_blueprints wares="ware.module_par_stor_container_m_01" />
        <add_blueprints wares="ware.module_par_stor_container_s_01" />
        <add_blueprints wares="ware.module_par_stor_liquid_l_01" />
        <add_blueprints wares="ware.module_par_stor_liquid_m_01" />
        <add_blueprints wares="ware.module_par_stor_liquid_s_01" />
        <add_blueprints wares="ware.module_par_stor_solid_l_01" />
        <add_blueprints wares="ware.module_par_stor_solid_m_01" />
        <add_blueprints wares="ware.module_par_stor_solid_s_01" />
        <add_blueprints wares="ware.module_tel_conn_base_01" />
        <add_blueprints wares="ware.module_tel_conn_base_02" />
        <add_blueprints wares="ware.module_tel_conn_base_03" />
        <add_blueprints wares="ware.module_tel_conn_cross_01" />
        <add_blueprints wares="ware.module_tel_conn_vertical_01" />
        <add_blueprints wares="ware.module_tel_conn_vertical_02" />
        <add_blueprints wares="ware.module_tel_def_claim_01" />
        <add_blueprints wares="ware.module_tel_def_disc_01" />
        <add_blueprints wares="ware.module_tel_def_tube_01" />
        <add_blueprints wares="ware.module_tel_hab_l_01" />
        <add_blueprints wares="ware.module_tel_hab_m_01" />
        <add_blueprints wares="ware.module_tel_hab_s_01" />
        <add_blueprints wares="ware.module_tel_pier_l_01" />
        <add_blueprints wares="ware.module_tel_pier_l_02" />
        <add_blueprints wares="ware.module_tel_pier_l_03" />
        <add_blueprints wares="ware.module_tel_stor_container_l_01" />
        <add_blueprints wares="ware.module_tel_stor_container_m_01" />
        <add_blueprints wares="ware.module_tel_stor_container_s_01" />
        <add_blueprints wares="ware.module_tel_stor_liquid_l_01" />
        <add_blueprints wares="ware.module_tel_stor_liquid_m_01" />
        <add_blueprints wares="ware.module_tel_stor_liquid_s_01" />
        <add_blueprints wares="ware.module_tel_stor_solid_l_01" />
        <add_blueprints wares="ware.module_tel_stor_solid_m_01" />
        <add_blueprints wares="ware.module_tel_stor_solid_s_01" />
        <add_blueprints wares="ware.mod_engine_boostduration_01_mk1" />
        <!-- <add_blueprints wares="ware.mod_engine_boostshielddrain_01_mk1" /> -->
        <add_blueprints wares="ware.mod_engine_boostthrust_01_mk1" />
        <add_blueprints wares="ware.mod_engine_boostthrust_01_mk2" />
        <add_blueprints wares="ware.mod_engine_boostthrust_01_mk3" />
        <add_blueprints wares="ware.mod_engine_boostthrust_02_mk1" />
        <add_blueprints wares="ware.mod_engine_boostthrust_02_mk2" />
        <add_blueprints wares="ware.mod_engine_forwardthrust_01_mk1" />
        <add_blueprints wares="ware.mod_engine_forwardthrust_01_mk2" />
        <add_blueprints wares="ware.mod_engine_forwardthrust_01_mk3" />
        <add_blueprints wares="ware.mod_engine_forwardthrust_02_mk1" />
        <add_blueprints wares="ware.mod_engine_forwardthrust_02_mk2" />
        <add_blueprints wares="ware.mod_engine_rotationthrust_01_mk1" />
        <add_blueprints wares="ware.mod_engine_rotationthrust_01_mk3" />
        <add_blueprints wares="ware.mod_engine_rotationthrust_02_mk1" />
        <add_blueprints wares="ware.mod_engine_strafethrust_01_mk1" />
        <add_blueprints wares="ware.mod_engine_strafethrust_02_mk1" />
        <add_blueprints wares="ware.mod_engine_travelattacktime_01_mk1" />
        <add_blueprints wares="ware.mod_engine_travelchargetime_01_mk1" />
        <add_blueprints wares="ware.mod_engine_travelreleasetime_01_mk1" />
        <add_blueprints wares="ware.mod_engine_travelstartthrust_01_mk1" />
        <add_blueprints wares="ware.mod_engine_travelthrust_01_mk1" />
        <add_blueprints wares="ware.mod_engine_travelthrust_01_mk2" />
        <add_blueprints wares="ware.mod_engine_travelthrust_01_mk3" />
        <add_blueprints wares="ware.mod_engine_travelthrust_02_mk1" />
        <add_blueprints wares="ware.mod_engine_travelthrust_02_mk2" />
        <add_blueprints wares="ware.mod_shield_capacity_01_mk1" />
        <add_blueprints wares="ware.mod_shield_capacity_01_mk2" />
        <add_blueprints wares="ware.mod_shield_capacity_01_mk3" />
        <add_blueprints wares="ware.mod_shield_capacity_02_mk3" />
        <add_blueprints wares="ware.mod_shield_rechargedelay_01_mk1" />
        <add_blueprints wares="ware.mod_shield_rechargerate_01_mk1" />
        <add_blueprints wares="ware.mod_shield_rechargerate_01_mk2" />
        <add_blueprints wares="ware.mod_shield_rechargerate_01_mk3" />
        <add_blueprints wares="ware.mod_ship_countermeasurecapacity_01_mk1" />
        <add_blueprints wares="ware.mod_ship_deployablecapacity_01_mk1" />
        <add_blueprints wares="ware.mod_ship_drag_01_mk1" />
        <add_blueprints wares="ware.mod_ship_drag_01_mk2" />
        <add_blueprints wares="ware.mod_ship_mass_01_mk1" />
        <add_blueprints wares="ware.mod_ship_mass_01_mk2" />
        <add_blueprints wares="ware.mod_ship_mass_01_mk3" />
        <add_blueprints wares="ware.mod_ship_maxhull_01_mk1" />
        <add_blueprints wares="ware.mod_ship_missilecapacity_01_mk1" />
        <add_blueprints wares="ware.mod_ship_radarrange_01_mk1" />
        <add_blueprints wares="ware.mod_ship_unitcapacity_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_beamlength_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_chargetime_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_cooling_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_cooling_01_mk2" />
        <add_blueprints wares="ware.mod_weapon_cooling_02_mk1" />
        <add_blueprints wares="ware.mod_weapon_cooling_02_mk2" />
        <add_blueprints wares="ware.mod_weapon_cooling_03_mk1" />
        <add_blueprints wares="ware.mod_weapon_cooling_03_mk2" />
        <add_blueprints wares="ware.mod_weapon_cooling_04_mk2" />
        <add_blueprints wares="ware.mod_weapon_cooling_05_mk2" />
        <add_blueprints wares="ware.mod_weapon_damage_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_damage_01_mk2" />
        <add_blueprints wares="ware.mod_weapon_damage_01_mk3" />
        <add_blueprints wares="ware.mod_weapon_damage_02_mk1" />
        <add_blueprints wares="ware.mod_weapon_damage_02_mk2" />
        <add_blueprints wares="ware.mod_weapon_damage_02_mk3" />
        <add_blueprints wares="ware.mod_weapon_damage_03_mk1" />
        <add_blueprints wares="ware.mod_weapon_damage_03_mk2" />
        <add_blueprints wares="ware.mod_weapon_damage_04_mk2" />
        <add_blueprints wares="ware.mod_weapon_damage_05_mk2" />
        <add_blueprints wares="ware.mod_weapon_lifetime_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_mining_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_mining_01_mk3" />
        <add_blueprints wares="ware.mod_weapon_reload_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_rotationspeed_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_speed_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_speed_01_mk3" />
        <add_blueprints wares="ware.mod_weapon_sticktime_01_mk1" />
        <add_blueprints wares="ware.mod_weapon_sticktime_01_mk2" />
        <add_blueprints wares="ware.mod_weapon_sticktime_02_mk2" />
        <add_blueprints wares="ware.mod_weapon_sticktime_03_mk2" />
        <add_blueprints wares="ware.paintmod_0001" />
        <add_blueprints wares="ware.paintmod_0002" />
        <add_blueprints wares="ware.paintmod_0003" />
        <add_blueprints wares="ware.paintmod_0004" />
        <add_blueprints wares="ware.paintmod_0005" />
        <add_blueprints wares="ware.paintmod_0006" />
        <add_blueprints wares="ware.paintmod_0007" />
        <add_blueprints wares="ware.paintmod_0008" />
        <add_blueprints wares="ware.paintmod_0009" />
        <add_blueprints wares="ware.paintmod_0010" />
        <add_blueprints wares="ware.paintmod_0011" />
        <add_blueprints wares="ware.paintmod_0012" />
        <add_blueprints wares="ware.paintmod_0013" />
        <add_blueprints wares="ware.paintmod_0014" />
        <add_blueprints wares="ware.paintmod_0015" />
        <add_blueprints wares="ware.paintmod_0016" />
        <add_blueprints wares="ware.paintmod_0017" />
        <add_blueprints wares="ware.paintmod_0018" />
        <add_blueprints wares="ware.paintmod_0019" />
        <add_blueprints wares="ware.paintmod_0020" />
        <add_blueprints wares="ware.paintmod_0021" />
        <add_blueprints wares="ware.paintmod_0022" />
        <add_blueprints wares="ware.paintmod_0023" />
        <add_blueprints wares="ware.paintmod_0024" />
        <add_blueprints wares="ware.paintmod_0025" />
        <add_blueprints wares="ware.paintmod_0026" />
        <add_blueprints wares="ware.paintmod_0027" />
        <add_blueprints wares="ware.paintmod_0028" />
        <add_blueprints wares="ware.paintmod_0029" />
        <add_blueprints wares="ware.paintmod_0030" />
        <add_blueprints wares="ware.paintmod_0031" />
        <add_blueprints wares="ware.paintmod_0032" />
        <add_blueprints wares="ware.paintmod_0033" />
        <add_blueprints wares="ware.paintmod_0034" />
        <add_blueprints wares="ware.paintmod_0035" />
        <add_blueprints wares="ware.paintmod_0036" />
        <add_blueprints wares="ware.paintmod_0037" />
        <add_blueprints wares="ware.paintmod_0038" />
        <add_blueprints wares="ware.paintmod_0039" />
        <add_blueprints wares="ware.paintmod_0040" />
        <add_blueprints wares="ware.paintmod_0041" />
        <add_blueprints wares="ware.paintmod_0042" />
        <add_blueprints wares="ware.paintmod_0043" />
        <add_blueprints wares="ware.paintmod_0044" />
        <add_blueprints wares="ware.paintmod_0045" />
        <add_blueprints wares="ware.paintmod_0046" />
        <add_blueprints wares="ware.paintmod_0047" />
        <add_blueprints wares="ware.paintmod_0048" />
        <add_blueprints wares="ware.paintmod_0049" />
        <add_blueprints wares="ware.paintmod_0050" />
        <add_blueprints wares="ware.paintmod_0051" />
        <add_blueprints wares="ware.paintmod_0052" />
        <add_blueprints wares="ware.paintmod_0053" />
        <add_blueprints wares="ware.paintmod_0054" />
        <add_blueprints wares="ware.paintmod_0055" />
        <add_blueprints wares="ware.paintmod_0056" />


        <find_cluster groupname="$Clusters" multiple="true"/>
        <find_sector groupname="$Sectors" space="player.galaxy" multiple="true"/>
        <find_zone groupname="$Zones" space="player.galaxy" multiple="true"/>
        <do_all exact="$Clusters.count" counter="$Counter">
          <set_known object="$Clusters.{$Counter}" known="true"/>
        </do_all>
        <do_all exact="$Sectors.count" counter="$Counter">
          <set_known object="$Sectors.{$Counter}" known="true"/>
        </do_all>
        <do_all exact="$Zones.count" counter="$Counter">
          <set_known object="$Zones.{$Counter}" known="true"/>
        </do_all>
        <find_gate name="$gates" space="player.galaxy" multiple="true"/>
        <do_all exact="$gates.count" counter="$i">
          <set_known object="$gates.{$i}" known="true"/>
        </do_all>
        <find_station name="$allstations" space="player.galaxy" multiple="true" />
        <do_all exact="$allstations.count" counter="$i">
          <set_known object="$allstations.{$i}" known="true" updatesnapshot="true"/>
        </do_all>

        <find_station name="$allstations" space="player.galaxy" multiple="true" />
        <do_all exact="$allstations.count" counter="$i">
          <!-- <set_known object="$allstations.{$i}" known="true" updatesnapshot="true"/> -->
          <find_object_component name="$components" object="$allstations.{$i}" multiple="true"/>
          <do_all exact="$components.count" counter="$j">
            <do_if value="$components.{$j} != null">
              <set_object_scanned object="$components.{$j}.container"/>
            </do_if>
          </do_all>
        </do_all>
      </actions>
    </cue>
  </cues>
</mdscript>
`;
