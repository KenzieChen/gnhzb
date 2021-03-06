package prefuse.owl2prefuse.graph;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JEditorPane;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import prefuse.owl2prefuse.Constants;
import prefuse.owl2prefuse.ExportableGraphic;
import prefuse.Visualization;
import prefuse.action.Action;
import prefuse.action.filter.FisheyeTreeFilter;

/**
 * This class represents a graph in a JPanel.
 * <p/>
 * Project OWL2Prefuse <br/>
 * GraphPanel.java created 3 januari 2007, 11:47
 * <p/>
 * Copyright &copy 2006 Jethro Borsje
 * 
 * @author <a href="mailto:info@jborsje.nl">Jethro Borsje</a>
 * @version $$Revision: 1.2 $$, $$Date: 2009/10/09 02:54:08 $$
 */
public class GraphPanel2 extends JPanel implements ChangeListener,
		ExportableGraphic {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * The Prefuse Display which takes care of displaying the Prefuse graph.
	 */
	private GraphDisplay2 m_display;

	/**
	 * The spinner, used for adjusting the distance of the GraphDistanceFilter.
	 */
	private JSpinner m_spinner;

	/**
	 * Creates a new instance of GraphPanel
	 * 
	 * @param p_display
	 *            The Prefuse Display which has to be placed in this panel.
	 * @param p_legend
	 *            Indicates whether or not a legend should be added to the
	 *            panel.
	 * @param p_hopsControl
	 *            Indicates whether or not a widget for controlling the hops in
	 *            the graph should be added to the panel.
	 */
	public GraphPanel2(GraphDisplay2 p_display, boolean p_legend,
			boolean p_hopsControl) {
		super(new BorderLayout());
		m_display = p_display;
		initPanel(p_legend, p_hopsControl);
	}

	/**
	 * Export the display of the graph, to the given file type.
	 * 
	 * @param p_file
	 *            The file which is going to contain the export, valid file
	 *            types are: "png" and "jpg".
	 * @param p_fileType
	 *            The file type of the image to be created.
	 */
	public void export(File p_file, String p_fileType) {
		// Determine if there is a layout action running. If this is the case,
		// it
		// should be paused.
		Visualization vis = m_display.getVisualization();
		Action action = vis.getAction("layout");
		boolean pause = false;
		if (action != null)
			pause = action.isRunning();
		if (pause)
			vis.cancel("layout");

		try {
			// Export the display to an image.
			OutputStream out = new BufferedOutputStream(new FileOutputStream(
					p_file));
			m_display.saveImage(out, p_fileType, 1.0);
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// Run the layout action.
		if (pause)
			vis.run("layout");
	}

	/**
	 * Initialize this panel.
	 * 
	 * @param p_legend
	 *            Indicates whether or not a legend should be added to the
	 *            panel.
	 * @param p_hopsControl
	 *            Indicates whether or not a widget for controlling the hops in
	 *            the graph should be added to the panel.
	 */
	private void initPanel(boolean p_legend, boolean p_hopsControl) {
		setBackground(m_display.getBackground());
		setForeground(m_display.getForeground());

		add(m_display, BorderLayout.CENTER);
		add(createBox(), BorderLayout.SOUTH);
		if (p_legend || p_hopsControl)
			add(getSideBar(p_legend, p_hopsControl), BorderLayout.EAST);

	}

	/**
	 * Create the title and search panel widgets which are displayed at the
	 * bottom of the graph panel.
	 * 
	 * @return The title and searchpanel widgets in a Box.
	 */
	private Box createBox() {
		// Create a box to display the node title label and the search box.
		Box box = new Box(BoxLayout.X_AXIS);
		box.add(Box.createHorizontalStrut(10));
		// box.add(getShowMeta());
		box.add(Box.createHorizontalGlue());
		box.add(m_display.getSearchPanel());
		box.add(Box.createHorizontalStrut(3));
		box.setBackground(m_display.getBackground());
		box.setForeground(m_display.getForeground());

		return box;
	}

	/**
	 * Initialize the sidebar of the graph panel.
	 * 
	 * @param p_legend
	 *            Indicates whether or not a legend should be added to the
	 *            panel.
	 * @param p_hopsControl
	 *            Indicates whether or not a widget for controlling the hops in
	 *            the graph should be added to the panel.
	 * @return The sidebar.
	 */
	private JPanel getSideBar(boolean p_legend, boolean p_hopsControl) {
		// 显示知识内涵 表示
		boolean showmeta = true;
		// Create the panel.
		JPanel panel = new JPanel(new GridBagLayout());
		GridBagConstraints constraints = new GridBagConstraints();
		constraints.anchor = GridBagConstraints.FIRST_LINE_START;

		int y = 0;

		constraints.gridx = 0;
		constraints.gridy = y++;
		panel.setSize(150, 600);
		if (!p_hopsControl)
			constraints.weighty = 1;
		if (p_legend)
			panel.add(getLegend(), constraints);

		if (p_hopsControl) {
			constraints.gridy = y++;
			constraints.weighty = 0;
			constraints.fill = GridBagConstraints.HORIZONTAL;
			panel.add(getHopsWidgets(), constraints);
		}
		if (showmeta) {
			constraints.gridy = y++;
			constraints.weighty = 1;
			constraints.fill = GridBagConstraints.HORIZONTAL;
			panel.add(getShowMeta(), constraints);
		}
		// Set the background of the panel.
		panel.setBackground(m_display.getBackground());

		return panel;
	}

	/**
	 * Create a legend pane and return it.
	 * 
	 * @return The legend in an editor pane.
	 */
	public JEditorPane getLegend() {
		String content = ""
				+ "<table width=\"200px\">"

				+ "<tr><td bgcolor=\""
				+ Integer
						.toHexString(Constants.NODE_COLOR_INDIVIDUAL & 0x00ffffff)
				+ "\"></td><td>知识实例</td></tr>"
				+ "<tr><td bgcolor=\""
				+ Integer
						.toHexString(Constants.NODE_COLOR_SELECTED & 0x00ffffff)
				+ "\"></td><td>选中节点</td></tr>"
				+ "<tr><td bgcolor=\""
				+ Integer
						.toHexString(Constants.NODE_COLOR_HIGHLIGHTED & 0x00ffffff)
				+ "\"></td><td>节点选择路线</td></tr>"
				+ "<tr><td bgcolor=\""
				+ Integer.toHexString(Constants.NODE_COLOR_CLASS & 0x00ffffff)
				+ "\" width=\"20px\"></td><td width=\"180px\">循环节点(标*)</td></tr>"
				+ "<tr><td bgcolor=\""
				+ Integer.toHexString(Constants.NODE_COLOR_SEARCH & 0x00ffffff)
				+ "\"></td><td>查询结果的节点</td></tr>"
				+ "<tr><td bgcolor=\""
				+ Integer
						.toHexString(Constants.NODE_DEFAULT_COLOR & 0x00ffffff)
				+ "\"></td><td>关系节点</td></tr>" + "</table>";

		JEditorPane legend = new JEditorPane("text/html", content);
		legend.setPreferredSize(new Dimension(150, 200));
		legend.setEditable(false);
		legend.setBorder(new TitledBorder("图例"));

		// JPanel panel = new JPanel();
		// panel.setBorder(new TitledBorder("图例"));
		// panel.add(legend);

		return legend;
	}

	/**
	 * Create a panel containing a JSpinner which can be used to set the number
	 * of hops, used in the graph distance filter.
	 * 
	 * @return A JPanel containing the hops widgets.
	 */
	private JPanel getHopsWidgets() {
		// Get the GraphDistanceFilter.
		FisheyeTreeFilter filter = m_display.getFisheyeTreeFilter();
		// m_display.get
		// Create the panel.
		JPanel panel = new JPanel(new GridBagLayout());
		GridBagConstraints constraints = new GridBagConstraints();
		constraints.anchor = GridBagConstraints.FIRST_LINE_START;
		// panel.setSize(150, 30);
		// Create the label.
		JLabel label = new JLabel("展开级数控制： ");

		// Create the spinner and its model.
		SpinnerNumberModel model = new SpinnerNumberModel(filter.getDistance(),
				0, null, 1);
		m_spinner = new JSpinner();
		m_spinner.addChangeListener(this);
		m_spinner.setModel(model);

		// Add the label and the spinner to the panel.
		constraints.gridx = 0;
		constraints.gridy = 0;
		panel.add(label, constraints);
		constraints.gridx = 1;
		constraints.weighty = 1;
		panel.add(m_spinner, constraints);

		// Set the background of the panel.
		panel.setBackground(m_display.getBackground());

		// Add a titled border to the panel.
		panel.setBorder(new TitledBorder("级数控制"));

		return panel;
	}

	private JPanel getShowMeta() {
		JPanel panel = new JPanel();

		panel.add(m_display.getTitleLabel());
		// Set the background of the panel.
		panel.setBackground(m_display.getBackground());
		panel.setSize(150, 160);
		// Add a titled border to the panel.
		panel.setBorder(new TitledBorder("知识属性"));
		return panel;
	}

	/**
	 * This method is implemented because this class implements the
	 * ChangeListener interface. It takes care of the event that user changes
	 * the distance, used by the GraphDistanceFilter.
	 * 
	 * @param e
	 *            The ChangeEvent.
	 */
	public void stateChanged(ChangeEvent e) {
		int value = ((Integer) m_spinner.getValue()).intValue();

		// Get the GraphDistanceFilter.
		FisheyeTreeFilter filter = m_display.getFisheyeTreeFilter();
		filter.setDistance(value * 2);

		filter.run();

		// Draw the nodes that are made visible by the adjustment of the hops
		// parameter.
		m_display.getVisualization().run("filter");
	}
}