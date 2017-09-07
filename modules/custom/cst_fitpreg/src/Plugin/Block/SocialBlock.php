<?php

namespace Drupal\cst_fitpreg\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * @Block(
 *  id = "social_block",
 *  admin_label = @Translation("Header social block"),
 * )
 */
class SocialBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#type' => 'theme',
      '#theme' => 'header_social_block',
    );
  }
}