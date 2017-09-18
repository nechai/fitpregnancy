<?php
  /**
 * @file
 * Contains \Drupal\week_block\Plugin\Block\WeekBlock.
 */
namespace Drupal\week_block\Plugin\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\node\NodeInterface;
  /**
 * @Block(
 *   id = "week_block",
 *   admin_label = @Translation("week_block_header")
 * )
 */
class WeekBlock extends BlockBase {
  /**
  * {@inheritdoc}
  */
  public function build() {
    $fields = \Drupal::entityManager()->getFieldDefinitions('node', 'week');
    $nodes = $fields['field_week']->getSettings()['allowed_values'];
    return array(
    '#theme' => 'week_block',
    '#nodes' => $nodes,
    );
  }
}

