const scheduleTemplates = {
  1: `
    <div class="dsr_section dsr_title">DUTY SECTION {duty_section}</div>
    <div class="dsr_section dsl_center_text solid_border_bottom dsl_bold">{duty_section_leader_name} - {duty_section_leader_number}</div>
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">{day_of_week}</div>
      <div class="dsr_25 dsl_center_text">{date}</div>
      <div class="dsr_30 dsl_center_text">DUTY SWAP</div>
      <div class="dsr_25_end dsl_center_text">SIGNATURE</div>
    </div>
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">TIME</div>
      <div class="dsr_25 dsl_center_text">MOOW</div>
      <div class="dsr_30 dsl_center_text">MOOW</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <!-- MOOW Times -->
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1730 - 2200</div>
      <div class="dsr_25 dsl_center_text">{moow_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">2200 - 2230</div>
      <div class="dsr_25 dsl_center_text">{moow_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Rover Times -->
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">TIME</div>
      <div class="dsr_25 dsl_center_text">ROVERS</div>
      <div class="dsr_30 dsl_center_text">ROVERS</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1730 - 2200</div>
      <div class="dsr_25 dsl_center_text">{rover_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text">2200 - 2230</div>
      <div class="dsr_25 dsl_center_text">{rover_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{rover_3}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Duty Drivers -->
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text dsl_bold">Duty Drivers</div>
      <div class="dsr_25 dsl_center_text">{driver_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{driver_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Colors -->
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text dsl_bold">Colors</div>
      <div class="dsr_25 dsl_center_text">{color_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{color_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Sunset Times -->
    <div class="dsr_section">
      <div class="dsr_75 dsl_center_text dsr_font_10 dsl_bold">SUNSET @ {sunset_time}</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <div class="dsr_section dsl_bold">&nbsp; NOTES:</div>
    <div class="dsr_section">{notes}</div>
  `,
  2: `
    <div class="dsr_section dsr_title">DUTY SECTION {duty_section}</div>
    <div class="dsr_section dsl_center_text solid_border_bottom dsl_bold">{duty_section_leader_name} - {duty_section_leader_number}</div>
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">{day_of_week}</div>
      <div class="dsr_25 dsl_center_text">{date}</div>
      <div class="dsr_30 dsl_center_text">DUTY SWAP</div>
      <div class="dsr_25_end dsl_center_text">SIGNATURE</div>
    </div>
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">TIME</div>
      <div class="dsr_25 dsl_center_text">MOOW</div>
      <div class="dsr_30 dsl_center_text">MOOWD</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <!-- MOOW Times -->
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1730 - 2200</div>
      <div class="dsr_25 dsl_center_text">{moow_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">2200 - 0300</div>
      <div class="dsr_25 dsl_center_text">{moow_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">0300 - 0800</div>
      <div class="dsr_25 dsl_center_text">{moow_3}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Rover Times -->
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">TIME</div>
      <div class="dsr_25 dsl_center_text">ROVERS</div>
      <div class="dsr_30 dsl_center_text">ROVERS</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsr_20_no_bottom dsl_center_text">1730 - 2200</div>
      <div class="dsr_25 dsl_center_text">{rover_1}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{rover_2}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text">2200 - 0300</div>
      <div class="dsr_25 dsl_center_text">{rover_3}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{rover_4}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text">0300 - 0800</div>
      <div class="dsr_25 dsl_center_text">{rover_5}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{rover_6}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Duty Drivers -->
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text dsl_bold">Duty Drivers</div>
      <div class="dsr_25 dsl_center_text">{driver_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{driver_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Colors -->
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text dsl_bold">Colors</div>
      <div class="dsr_25 dsl_center_text">{color_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{color_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Sunset Times -->
    <div class="dsr_section">
      <div class="dsr_75 dsl_center_text dsr_font_10 dsl_bold">SUNSET @ {sunset_time}</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <div class="dsr_section dsl_bold">&nbsp; NOTES:</div>
    <div class="dsr_section">{notes}</div>
  `,
  3: `
    <div class="dsr_section dsr_title">DUTY SECTION {duty_section}</div>
    <div class="dsr_section dsl_center_text solid_border_bottom dsl_bold">{duty_section_leader_name} - {duty_section_leader_number}</div>
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">{day_of_week}</div>
      <div class="dsr_25 dsl_center_text">{date}</div>
      <div class="dsr_30 dsl_center_text">DUTY SWAP</div>
      <div class="dsr_25_end dsl_center_text">SIGNATURE</div>
    </div>
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">TIME</div>
      <div class="dsr_25 dsl_center_text">MOOW</div>
      <div class="dsr_30 dsl_center_text">MOOW</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <!-- MOOW Times -->
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">0800 - 1300</div>
      <div class="dsr_25 dsl_center_text">{moow_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1300 - 1900</div>
      <div class="dsr_25 dsl_center_text">{moow_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1900 - 0200</div>
      <div class="dsr_25 dsl_center_text">{moow_3}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">0200 - 0800</div>
      <div class="dsr_25 dsl_center_text">{moow_4}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Rover Times -->
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">TIME</div>
      <div class="dsr_25 dsl_center_text">ROVERS</div>
      <div class="dsr_30 dsl_center_text">ROVERS</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">0800 - 1300</div>
      <div class="dsr_25 dsl_center_text">{rover_1}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1300 - 1900</div>
      <div class="dsr_25 dsl_center_text">{rover_2}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text">1900 - 0200</div>
      <div class="dsr_25 dsl_center_text">{rover_3}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{rover_4}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text">0200 - 0800</div>
      <div class="dsr_25 dsl_center_text">{rover_5}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{rover_6}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Duty Drivers -->
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text dsl_bold">Duty Drivers</div>
      <div class="dsr_25 dsl_center_text">{driver_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{driver_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Colors -->
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text dsl_bold">Colors</div>
      <div class="dsr_25 dsl_center_text">{color_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{color_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Sunset Times -->
    <div class="dsr_section">
      <div class="dsr_75 dsl_center_text dsr_font_10 dsl_bold">SUNSET @ {sunset_time}</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <div class="dsr_section dsl_bold">&nbsp; NOTES:</div>
    <div class="dsr_section">{notes}</div>
  `,
  4: `
    <div class="dsr_section dsr_title">DUTY SECTION {duty_section}</div>
    <div class="dsr_section dsl_center_text solid_border_bottom dsl_bold">{duty_section_leader_name} - {duty_section_leader_number}</div>
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">{day_of_week}</div>
      <div class="dsr_25 dsl_center_text">{date}</div>
      <div class="dsr_30 dsl_center_text">DUTY SWAP</div>
      <div class="dsr_25_end dsl_center_text">SIGNATURE</div>
    </div>
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">TIME</div>
      <div class="dsr_25 dsl_center_text">MOOW</div>
      <div class="dsr_30 dsl_center_text">MOOW</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <!-- MOOW Times -->
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">0800 - 1300</div>
      <div class="dsr_25 dsl_center_text">{moow_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1300 - 1900</div>
      <div class="dsr_25 dsl_center_text">{moow_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1900 - 2330</div>
      <div class="dsr_25 dsl_center_text">{moow_3}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Rover Times -->
    <div class="dsr_section dsl_bold">
      <div class="dsr_20 dsl_center_text">TIME</div>
      <div class="dsr_25 dsl_center_text">ROVERS</div>
      <div class="dsr_30 dsl_center_text">ROVERS</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">0800 - 1300</div>
      <div class="dsr_25 dsl_center_text">{rover_1}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">1300 - 1900</div>
      <div class="dsr_25 dsl_center_text">{rover_2}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text">1900 - 2330</div>
      <div class="dsr_25 dsl_center_text">{rover_3}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{rover_4}&nbsp;</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Duty Drivers -->
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text dsl_bold">Duty Drivers</div>
      <div class="dsr_25 dsl_center_text">{driver_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{driver_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Colors -->
    <div class="dsr_section">
      <div class="dsr_20_no_bottom dsl_center_text dsl_bold">Colors</div>
      <div class="dsr_25 dsl_center_text">{color_1}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <div class="dsr_section">
      <div class="dsr_20 dsl_center_text">&nbsp;</div>
      <div class="dsr_25 dsl_center_text">{color_2}</div>
      <div class="dsr_30 dsl_center_text">&nbsp;</div>
      <div class="dsr_25_end dsl_center_text">&nbsp;</div>
    </div>
    <!-- Sunset Times -->
    <div class="dsr_section">
      <div class="dsr_75 dsl_center_text dsr_font_10 dsl_bold">SUNSET @ {sunset_time}</div>
      <div class="dsr_25_end dsl_center_text dsr_black">&nbsp;</div>
    </div>
    <div class="dsr_section dsl_bold">&nbsp; NOTES:</div>
    <div class="dsr_section">{notes}</div>
  `,
};

function populateTemplate(template, data) {
  try {
    return template
      .replace('{duty_section}', data.duty_section || '')
      .replace('{duty_section_leader_name}', data.duty_section_leader_name || '')
      .replace('{duty_section_leader_number}', data.duty_section_leader_number || '')
      .replace('{day_of_week}', data.day_of_week || '')
      .replace('{date}', data.date || '')
      .replace('{moow_1}', data.assignments.moow[0] || '')
      .replace('{moow_2}', data.assignments.moow[1] || '')
      .replace('{moow_3}', data.assignments.moow[2] || '')
      .replace('{moow_4}', data.assignments.moow[3] || '')
      .replace('{rover_1}', data.assignments.rover[0] || '')
      .replace('{rover_2}', data.assignments.rover[1] || '')
      .replace('{rover_3}', data.assignments.rover[2] || '')
      .replace('{rover_4}', data.assignments.rover[3] || '')
      .replace('{rover_5}', data.assignments.rover[4] || '')
      .replace('{rover_6}', data.assignments.rover[5] || '')
      .replace('{driver_1}', data.assignments.duty_driver[0] || '')
      .replace('{driver_2}', data.assignments.duty_driver[1] || '')
      .replace('{color_1}', data.assignments.colors[0] || '')
      .replace('{color_2}', data.assignments.colors[1] || '')
      .replace('{sunset_time}', data.sunset_time || '')
      .replace('{notes}', data.specific_notes_for_duty_section || '');
  } catch (error) {
    console.error("Error populating template:", error);
    console.error("Template:", template);
    console.error("Data:", data);
    return template; // Return the original template in case of error to prevent breaking the page
  }
}



// Fetch the updated database from sessionStorage 
let db = JSON.parse(sessionStorage .getItem('db'));
const selectedRosterKey = db.selectedRoster;

if (db && db.rosters && db.rosters[selectedRosterKey] && db.rosters[selectedRosterKey].roster) {
  const roster = db.rosters[selectedRosterKey].roster;
  
  const days = {
    mon: 'monday',
    tue: 'tuesday',
    wed: 'wednesday',
    thu: 'thursday',
    fri: 'friday',
    sat: 'saturday',
    sun: 'sunday'
  };

  Object.entries(days).forEach(([shortDay, longDay]) => {
    
    const dayData = roster[shortDay];
    
    if (dayData) {
      const scheduleTemplate = scheduleTemplates[dayData.schedule];
      if (scheduleTemplate) {
        const populatedTemplate = populateTemplate(scheduleTemplate, {
          duty_section: dayData.duty_section,
          duty_section_leader_name: dayData.duty_section_leader_name,
          duty_section_leader_number: dayData.duty_section_leader_number,
          day_of_week: longDay.toUpperCase(),
          date: dayData.date,
          assignments: dayData.assignments,
          sunset_time: dayData.sunset_time,
          specific_notes_for_duty_section: dayData.specific_notes_for_duty_section
        });
        document.getElementById(`${longDay}_layout`).innerHTML = populatedTemplate;
      } else {
        console.error(`Schedule template for schedule type ${dayData.schedule} not found.`);
      }
    } else {
      console.error(`Data for ${longDay} is not found in the roster.`);
    }
  });
} else {
  console.error('Roster data not found or invalid.');
}

// SHOW NOTE FROM DB
document.addEventListener('DOMContentLoaded', displayNotesOnPage);

function displayNotesOnPage() {
    const notesContainer = document.getElementById('notesContainer');
    let notes = JSON.parse(sessionStorage .getItem('additional_notes')) || [];

    if (notes.length === 0) {
        notesContainer.innerHTML = '<p>No additional notes available.</p>';
    } else {
        notesContainer.innerHTML = notes.map(note => `<p>${note}</p>`).join('');
    }
}
